import { TranslationKey } from "../types/languages";

type Translations = {
  [key in TranslationKey]: string;
};

export const chineseTranslations: Translations = {
  "common.appName": "祷告事项软件",
  "common.actions.select": "选择",
  "common.actions.save": "保存",
  "common.preview": "预览",
  "common.actions.cancel": "取消",

  "loading.userData.text": "如载用户数据",
  "loading.userData.label": "用户数据",

  "language.chooseLanguage.text": "选你的语言",
  "language.chooseLanguage.label": "语言",
  "language.setting.label": "语言偏好",
  "language.english.option": "英文",
  "language.chinese.option": "中文",

  "authScreen.welcome.header": "欢迎使用",
  "authScreen.tagline.text": "最容易的方法来管理你的祷告生活",
  "authScreen.signin.action": "登录",
  "authScreen.signup.action": "注册",

  "signup.createAccount.label": "建立你的帐号",
  "signup.username.label": "用户名",
  "signup.email.label": "电子邮件地址",
  "signup.password.label": "密码",
  "signup.displayName.label": "显示名称",
  "signup.confirmPassword.label": "确认密码",
  "signup.haveAccount.text": "已经有账号吗？",

  "signin.signinToAccount.label": "登录到你的账号",
  "signin.missingAccount.text": "还没有长好？",

  "form.validation.isRequired.error": "{{field}}必填。",
  "form.validation.isInvalid.error": "{{field}}无效。",
  "form.validation.characters.error": "{{field}}不能包含#、@或空格。",
  "form.validation.confirmPasswordRequired.error": "请确认你的密码。",
  "form.validation.passwordsMismatch.error": "密码不一样。",
  "form.validation.unique.error": "此{{field}}已被使用。",
  "form.validation.emailNotFound.error": "我们找不到使用该电子邮件地址的用户。",
  "form.validation.incorrectPassword.error": "你的密码不正确",
  "form.validation.fileSize": "文件大小必须小于{{size}}。",

  "toaster.failed.saveFailure": "保存{{item}}失败",
  "toaster.failed.loadFailure": "如载{{item}}失败",
  "toaster.failed.genericFailure": "{{item}}失败",

  "navigation.drawer.screen.home": "主页",
  "navigation.drawer.screen.createPrayerGroup": "创建新祷告小组",

  "wizard.stepCount": "第{{step}}步、共{{total}}步",
  "wizard.next": "下一步",

  "createPrayerGroup.groupNameDescription.title": "介绍你的祷告小组",
  "createPrayerGroup.groupNameDescription.groupName": "小组名字",
  "createPrayerGroup.groupNameDescription.description": "描述",
  "createPrayerGroup.groupNameDescription.validateGroupFailed":
    "小组名字验证失败",
  "createPrayerGroup.rules.title": "为您的小组添加内容规则",
  "createPrayerGroup.rules.stepDescription":
    "让您的小组成员知道可以发布什么内容。",
  "createPrayerGroup.rules.label": "规则",
  "createPrayerGroup.groupImageColorStep.title": "为您的小组添加样式",
  "createPrayerGroup.groupImageColorStep.description":
    "小组图片和颜色可以让您的小组更突出。",
  "createPrayerGroup.groupImageColorStep.color": "颜色",
  "createPrayerGroup.groupImageColorStep.selectColor": "选颜色",
  "createPrayerGroup.groupImageColorStep.image": "图片",
  "createPrayerGroup.groupImageColorStep.selectImage": "选图片",
};
