# GFormItem

## 解决什么问题

- 通过配置生成表单。
- 解决表单嵌套情况下校验困难的问题。
- 简化默认的表单校验写法。
- 解决表单规模较大时因响应式机制导致性能变差的问题。
- 保持表单布局灵活性。
- 按需引入表单项组件，提高性能。
- 允许使用自定义表单项组件。
- 避免表单初始化时序问题。
- 表单数据内外双向同步。

## 嵌套表单

以`formData.建设单位.人员`为例。

仅需设置`formItemConfig`的`dataKey`为`建设单位.人员`即可。

## 添加新的表单项类型

- 表单项组件需暴露`model-value`和`@update:model-value`。
- `GFormItem.vue`中表单项组件一栏添加新表单项。
- `nonBusiness/config.ts`中`FormItemConfig`添加新的类型。

## 添加新的校验规则

- 在`nonBusiness/rule.ts`中添加。
