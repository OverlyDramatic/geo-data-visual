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
  MessageBox
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

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
