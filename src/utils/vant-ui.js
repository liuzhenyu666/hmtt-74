// 这个文件专门用于进行vant的按需导入
import Vue from 'vue'
// 自动按需导入
import {
  Button,
  Switch,
  NavBar,
  CellGroup,
  Field,
  Toast,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  List,
  Cell,
  Grid,
  GridItem,
  PullRefresh,
  Lazyload,
  Image,
  Popup,
  Icon
} from 'vant'
Vue.use(Icon)
Vue.use(Popup)
Vue.use(Image)
Vue.use(Lazyload)
Vue.use(PullRefresh)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
Vue.use(Switch)
Vue.use(NavBar)
Vue.use(CellGroup)
Vue.use(Field)
Vue.use(Toast)
