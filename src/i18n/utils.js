import { ui, defaultLanguage, showDefaultLang, routes  } from './ui';

export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split('/');
  return (lang in ui) ? lang : defaultLanguage;
}

export function useTranslations(lang) {
  return function t(key) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang) {
  return function translatePath(path, l = lang) {
    const pathName = path.replaceAll('/', '');
    const hasTranslation = defaultLanguage !== l && routes[l] !== undefined && routes[l][pathName] !== undefined;
    const translatePath = hasTranslation ? '/' + routes[l][pathName] : path;
    return !showDefaultLang && l === defaultLanguage ? translatePath : `/${l}${translatePath}`;
  }
}

export function getRouteFromUrl(url) {
  const pathname = new URL(url).pathname;
  const parts = pathname?.split('/');
  const path = parts.pop() || parts.pop();

  if (path === undefined) {
    return undefined;
  }

  const currentLang = getLangFromUrl(url);

  if (defaultLanguage === currentLang) {
    const route = Object.values(routes)[0];
    return route[path] !== undefined ? route[path] : undefined;
  }

  const getKeyByValue = (obj, value)  => {
      return Object.keys(obj).find((key) => obj[key] === value);
  }

  const reversedKey = getKeyByValue(routes[currentLang], path);

  if (reversedKey !== undefined) {
    return reversedKey;
  }

  return undefined;
}