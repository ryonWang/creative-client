import { ref, reactive } from 'vue'
import { Message } from 'element-ui'

const icons = {
  edit: 'el-icon-edit',
  delete: 'el-icon-delete',
  plus: 'el-icon-plus',
  setting: 'el-icon-setting'
}

<i class="el-icon-edit"></i>
<i class="el-icon-delete"></i>

<el-drawer
  :visible.sync="drawerVisible"
  :title="'页面编辑器'"
  :size="'80%'"
>
</el-drawer> 