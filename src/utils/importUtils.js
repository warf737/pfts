// @ts-check
const DELAY = 10;

/**
 * @param {string} componentName
 */
export const loadComponent = componentName => () => ({
  component: import(`@/components/${componentName}/${componentName}`),
  DELAY
});

/** @param {string} pageName */
export const loadPage = pageName => () => ({
  component: import(`@/pages/${pageName}/${pageName}`),
  DELAY
});

export const loadScriptPage = scriptPage => () => ({
  component: import(`@/pages/scripts/${scriptPage}/${scriptPage}`),
  DELAY
});
