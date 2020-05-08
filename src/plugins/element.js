import Vue from 'vue'
import {
  Button,
  Card,
  Divider,
  Message,
  Input,
  Form,
  FormItem,
  DatePicker,
  Radio,
  Checkbox,
  CheckboxGroup,
  MessageBox,
  Container,
  Aside,
  Main,
  Header,
  PageHeader,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
} from 'element-ui'

Vue.use(Button)
Vue.use(Card)
Vue.use(Divider)
Vue.use(Message)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(PageHeader)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
