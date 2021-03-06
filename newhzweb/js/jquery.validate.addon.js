/**
 * Created by zztac on 14-3-26.
 */
$.extend($.validator.messages, {
    required: "必须填写",
    remote: "请修正此栏位",
    email: "请输入有效的电子邮件",
    mobile:"请填写有效的手机号",
    idcard:"请填写有效的身份证号码",
    url: "请输入有效的网址",
    date: "请输入有效的日期",
    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
    number: "请输入正确的数字",
    digits: "只可输入数字",
    creditcard: "请输入有效的信用卡号码",
    equalTo: "两次输入不一致",
    extension: "请输入有效的后缀",
    maxlength: $.validator.format("最多 {0} 个字"),
    minlength: $.validator.format("最少 {0} 个字"),
    rangelength: $.validator.format("请输入长度为 {0} 至 {1} 之间的字符"),
    range: $.validator.format("请输入 {0} 至 {1} 之间的数值"),
    max: $.validator.format("请输入不大于 {0} 的数值"),
    min: $.validator.format("请输入不小于 {0} 的数值")
});

$.validator.addMethod("mobile", function(value, element) {
    return this.optional(element) || /^1\d{10}$/.test(value);
});
$.validator.addMethod("idcard", function(value, element) {
    return this.optional(element) || /^\d{17}(\d|x)$/.test(value);
});
