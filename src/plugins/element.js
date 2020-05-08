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
  MenuItemGroup,
  card,
  Tabs,
  TabPane,
  Table,
  TableColumn
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
Vue.use(card)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
