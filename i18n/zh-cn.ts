import { TranslationKey } from "../types/languages";

type Translations = {
  [key in TranslationKey]: string;
};

export const chineseTranslations: Translations = {
  "common.appName": "祷告事项软件",
  "common.user": "用户",

  "common.actions.select": "选择",
  "common.actions.save": "保存",
  "common.actions.preview": "预览",
  "common.actions.cancel": "取消",
  "common.actions.retry": "重试",

  "loading.userData.text": "加载用户数据",
  "loading.userData.label": "用户数据",
  "loading.prayerGroup.text": "加载祷告小组",
  "loading.prayerGroup.error": "无法加载祷告小组。请再试一次。",

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
  "form.validation.imageFileType": "图片格式必须是 JPG、JPEG 或 PNG。",

  "toaster.failed.saveFailure": "保存{{item}}失败",
  "toaster.failed.loadFailure": "加载{{item}}失败",
  "toaster.failed.genericFailure": "{{item}}失败",
  "toaster.failed.removeFailure": "无法删除{{item}}",
  "toaster.failed.addUserFailure": "用户加入失败",
  "toaster.failed.updateFailure": "无法编辑{{item}}",

  "navigation.drawer.screen.home": "主页",
  "navigation.drawer.screen.createPrayerGroup": "创建新祷告小组",
  "navigation.drawer.screen.yourPrayerGroups": "您的祷告小组",

  "wizard.stepCount": "第{{step}}步、共{{total}}步",
  "wizard.next": "下一步",

  "prayerGroup.label": "祷告小组",

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
    "小组头像和横幅图片可以让您的小组更突出。",
  "createPrayerGroup.groupImageColorStep.color": "颜色",
  "createPrayerGroup.groupImageColorStep.selectColor": "选颜色",
  "createPrayerGroup.groupImageColorStep.image": "头像",
  "createPrayerGroup.groupImageColorStep.selectImage": "选图片",
  "createPrayerGroup.groupImageColorStep.banner": "横幅图片",
  "createPrayerGroup.groupImageColorStep.unableToSelectImage": "无法选择图片",

  "prayerGroup.actions.join": "加入",
  "prayerGroup.actions.joined": "加入了",
  "prayerGroup.actions.addPrayerRequest": "添加祷告事项",
  "prayerGroup.actions.groupOptions": "小组选项",

  "image.missing.label": "没有图片",

  "prayerGroup.options.about": "关于祷告小组",
  "prayerGroup.options.editPrayerGroup": "编辑祷告小组",

  "prayerGroup.about.header": "关于{{groupName}}",
  "prayerGroup.about.admins": "管理员",

  "prayerGroup.edit.header": "编辑{{groupName}}",
  "prayerGroup.edit.images": "图片",

  "prayerGroup.manageUsers.label": "管理用户",
  "prayerGroup.manageUsers.loading": "加载祷告小组用户",
  "prayerGroup.manageUsers.unableToLoad": "无法加载小组用户",
  "prayerGroup.manageUsers.searchForUsers": "搜索用户",
  "prayerGroup.manageUsers.searchPlaceholder": "名字或用户名",
  "prayerGroup.manageUsers.admin": "管理员",
  "prayerGroup.manageUsers.member": "成员",
  "prayerGroup.manageUsers.usersLabel": "小组用户",
  "prayerGroup.manageUsers.updateSuccess": "编辑了小组用户",
  "prayerGroup.manageUsers.noUsersFound": "没有找到相关的用户",

  "prayerGroup.kickUser.header": "踢出用户？",
  "prayerGroup.kickUser.warning":
    "你确定要踢出{{fullName}}吗？此操作无法撤销。",
  "prayerGroup.kickUser.label": "踢出",

  "prayerGroup.permissionError.header": "权限错误",
  "prayerGroup.permissionError.message": "您没有足够的权限访问此页面",
  "prayerGroup.permissionError.goBackToGroup": "回到祷告小组",

  "prayerGroup.search.placeholder": "搜索祷告小组",
  "prayerGroup.search.prompt": "输入以搜索祷告小组",
  "prayerGroup.search.noneFound": "没有找到相关祷告小组",

  "prayerGroup.request.title": "标题",
};
