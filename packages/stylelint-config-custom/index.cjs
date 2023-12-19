module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  overrides: [
    { files: '**/*.scss', customSyntax: 'postcss-scss' },
    { files: '**/*.css', customSyntax: 'postcss' },
    { files: '**/*.vue', customSyntax: 'postcss-html' },
    { files: '**/*.cjs', customSyntax: 'postcss-html' },
    { files: '**/*.js', customSyntax: 'postcss-html' },
    { files: '**/*.ts', customSyntax: 'postcss-html' }
  ],
  rules: {
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['opx']
      }
    ],
    'font-family-no-missing-generic-family-keyword': null,
    'import-notation': 'string',
    'color-hex-length': 'long',
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands']
      }
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['/^([a-z][a-z0-9]*)([A-Z][a-z0-9]*)*$/']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'export', 'global']
      }
    ],
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)([-_]*[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case'
      }
    ],
    'selector-id-pattern': [
      '^([a-z][a-z0-9]*)([-_]*[a-z0-9]+)*$',
      {
        message: 'Expected id selector to be camelCase'
      }
    ],
    'scss/dollar-variable-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'scss/at-mixin-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'scss/at-function-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    'custom-media-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected custom media query name to be kebab-case'
      }
    ],
    'custom-property-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected custom property name to be kebab-case'
      }
    ],
    'keyframes-name-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected keyframe name to be kebab-case'
      }
    ],
    'at-rule-empty-line-before': ['always', { ignore: ['inside-block', 'blockless-after-same-name-blockless'] }],
    'media-feature-range-notation': 'off',
    'order/properties-order': [
      // position
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      // box-model
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      // typography
      'font-size',
      'font-family',
      'font-weight',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      // visual
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      // misc
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ]
  }
}
