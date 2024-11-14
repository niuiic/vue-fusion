export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
  plugins: ['stylelint-scss'],
  overrides: [
    { files: '**/*.scss', customSyntax: 'postcss-scss' },
    { files: '**/*.css', customSyntax: 'postcss' },
    { files: '**/*.vue', customSyntax: 'postcss-html' },
    { files: '**/*.cjs', customSyntax: 'postcss-html' },
    { files: '**/*.js', customSyntax: 'postcss-html' },
    { files: '**/*.ts', customSyntax: 'postcss-html' }
  ],
  rules: {
    'selector-class-pattern': null
  }
}
