import Hello from '../packages/hello/hello'

const install = function (Vue) {
  if (install.installed) return

  Vue.component(Hello.name, Hello)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Hello
}
