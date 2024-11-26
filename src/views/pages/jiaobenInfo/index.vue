<template>
  <section
    class="ant-layout"
    style="margin-left: 20px; padding-top: 20px; height: 100vh"
  >
    <main
      class="ant-layout-content site-layout-background"
      style="margin: 0px; min-height: 280px"
    >
      <div style="height: 100%">
        <section
          class="ant-layout ant-layout-has-sider manage-layout container-layout__wrapper"
        >
          <aside
            class="ant-layout-sider ant-layout-sider-light conainer_asider conainer_left_asider ease-in-out"
            style="
              flex: 0 0 200px;
              max-width: 200px;
              min-width: 200px;
              width: 200px;
            "
          >
            <div class="ant-layout-sider-children">
              <div class="left-pannel__wrapper material-left__pannel">
                <div class="menu-main-title__container">
                  <span>脚本库</span>
                </div>
                <div class="tree-menu__container">
                  <div
                    role="tree"
                    class="ant-tree ant-tree-icon-hide tree-menu__wrapper"
                  >
                    <div>
                      <input
                        tabindex="0"
                        aria-label="for screen reader"
                        value=""
                        style="
                          width: 0px;
                          height: 0px;
                          display: flex;
                          overflow: hidden;
                          opacity: 0;
                          border: 0px;
                          padding: 0px;
                          margin: 0px;
                        "
                      />
                    </div>
                    <div
                      class="ant-tree-treenode"
                      aria-hidden="true"
                      style="
                        position: absolute;
                        pointer-events: none;
                        visibility: hidden;
                        height: 0px;
                        overflow: hidden;
                        border: 0px;
                        padding: 0px;
                      "
                    >
                      <div class="ant-tree-indent">
                        <div class="ant-tree-indent-unit"></div>
                      </div>
                    </div>
                    <div class="ant-tree-list" style="position: relative">
                      <div class="ant-tree-list-holder">
                        <div>
                          <div
                            class="ant-tree-list-holder-inner"
                            style="display: flex; flex-direction: column"
                          >
                            <div
                              class="ant-tree-treenode ant-tree-treenode-switcher-open ant-tree-treenode-selected ant-tree-treenode-leaf-last"
                              draggable="false"
                              aria-grabbed="false"
                            >
                              <span
                                aria-hidden="true"
                                class="ant-tree-indent"
                              ></span
                              ><span
                                class="ant-tree-switcher ant-tree-switcher_open"
                                ><span
                                  role="img"
                                  class="anticon ant-tree-switcher-icon"
                                  style="font-size: 16px"
                                  ><svg
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    focusable="false"
                                    class=""
                                  >
                                    <use
                                      xlink:href="#icon-vam-a-jiantou16"
                                    ></use></svg></span></span
                              ><span
                                title="我的脚本"
                                class="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-open ant-tree-node-selected"
                                ><span class="ant-tree-title"
                                  ><div class="tree-menu__node root font-bold">
                                    <span
                                      class="menu-title text-overflow-hidden"
                                      >我的脚本</span
                                    ><span
                                      class="suffix-icon"
                                    ></span></div></span
                              ></span>
                            </div>
                            <div
                              class="ant-tree-treenode ant-tree-treenode-switcher-open ant-tree-treenode-leaf-last"
                              draggable="false"
                              aria-grabbed="false"
                              v-for="jiaobenInfo in jiaobenInfoList" :key="index"
                            >
                              <span aria-hidden="true" class="ant-tree-indent"
                                ><span
                                  class="ant-tree-indent-unit ant-tree-indent-unit-start ant-tree-indent-unit-end"
                                ></span></span
                              ><span
                                class="ant-tree-switcher ant-tree-switcher-noop"
                              ></span
                              ><span
                                title="jiaobenInfo.scriptName"
                                class="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-normal"
                                ><span class="ant-tree-title"
                                  ><div class="tree-menu__node font-bold">
                                    <span
                                      class="menu-title text-overflow-hidden"
                                      >{{jiaobenInfo.scriptName}}</span
                                    ><span class="suffix-icon"
                                      ><div>
                                        <div class="dropdown-select">
                                          <span
                                            role="img"
                                            class="anticon ant-dropdown-trigger"
                                            style="font-size: 16px"
                                            ><svg
                                              width="1em"
                                              height="1em"
                                              fill="currentColor"
                                              aria-hidden="true"
                                              focusable="false"
                                              class=""
                                            >
                                              <use
                                                xlink:href="#icon-vam-more"
                                              ></use></svg
                                          ></span>
                                        </div></div
                                    ></span></div></span
                              ></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <div class="app-container" style="width: 100%;">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="脚本名称" prop="scriptName">
        <el-input
          v-model="queryParams.scriptName"
          placeholder="请输入脚本名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司ID" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入公司ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="createOper">
        <el-input
          v-model="queryParams.createOper"
          placeholder="请输入创建人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作人" prop="updateOper">
        <el-input
          v-model="queryParams.updateOper"
          placeholder="请输入操作人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="baseHandleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['hugai:jiaobenInfo:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['hugai:jiaobenInfo:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['hugai:jiaobenInfo:export']"
        >导出</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>

    <!-- <el-table v-loading="loading" :data="jiaobenInfoList" @selection-change="handleSelectionChange"> -->
      <el-table :data="jiaobenInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="脚本库ID" align="center" prop="id" />
      <el-table-column label="脚本名称" align="center" prop="scriptName" />
      <el-table-column label="用户id" align="center" prop="userId" />
      <el-table-column label="脚本状态" align="center" prop="status" />
      <el-table-column label="公司ID" align="center" prop="companyId" />
      <el-table-column label="创建人" align="center" prop="createOper" />
      <el-table-column label="操作人" align="center" prop="updateOper" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['hugai:jiaobenInfo:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['hugai:jiaobenInfo:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->

    <!-- 添加或修改脚本库对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="脚本名称" prop="scriptName">
          <el-input v-model="form.scriptName" placeholder="请输入脚本名称" />
        </el-form-item>
        <el-form-item label="脚本状态">
          <el-select v-model="form.status" prop="status">
            <el-option label="启用" value="1" />
            <el-option label="关闭" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
        </section>
        <div class="file-options-copy"></div>
        <div class="file-options-move"></div>
        <div class="folder-options-rename"></div>
        <div class="share-modal share-info-modal">
          <div class="ant-modal-root">
            <div
              tabindex="-1"
              class="ant-modal-wrap ant-modal-centered"
              style="display: none"
            >
              <div
                role="dialog"
                aria-labelledby="rc_unique_62"
                aria-modal="true"
                class="ant-modal"
                style="display: none; width: 454px"
              >
                <div
                  tabindex="0"
                  aria-hidden="true"
                  style="
                    width: 0px;
                    height: 0px;
                    overflow: hidden;
                    outline: none;
                  "
                ></div>
                <div class="ant-modal-content">
                  <button
                    type="button"
                    aria-label="Close"
                    class="ant-modal-close"
                  >
                    <span class="ant-modal-close-x"
                      ><svg
                        t="1656330647955"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2162"
                        width="16"
                        height="16"
                      >
                        <path
                          d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"
                          p-id="2163"
                          fill="#333333"
                        ></path></svg
                    ></span>
                  </button>
                  <div class="ant-modal-header">
                    <div class="ant-modal-title" id="rc_unique_62">
                      创建分享
                    </div>
                  </div>
                  <div class="ant-modal-body">
                    <form
                      id="create-share-form"
                      class="ant-form ant-form-horizontal"
                    >
                      <div class="ant-form-item share-input-title">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_shareTitle"
                              class="ant-form-item-no-colon"
                              title="分享名称"
                              >分享名称</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <input
                                  placeholder="请输入分享标题"
                                  id="create-share-form_shareTitle"
                                  class="ant-input"
                                  type="text"
                                  value=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ant-form-item">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_isSharePwd"
                              class="ant-form-item-no-colon"
                              title="启用密码"
                              >启用密码</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <button
                                  id="create-share-form_isSharePwd"
                                  type="button"
                                  role="switch"
                                  aria-checked="true"
                                  class="ant-switch ant-switch-checked"
                                >
                                  <div class="ant-switch-handle"></div>
                                  <span class="ant-switch-inner"></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ant-form-item share-input-pwd">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_sharePwd"
                              class="ant-form-item-no-colon"
                              title="密码"
                              >密码</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <input
                                  maxlength="4"
                                  placeholder="密码"
                                  id="create-share-form_sharePwd"
                                  class="ant-input"
                                  type="text"
                                  value="oIvz"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ant-form-item">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_isShareTermValidity"
                              class="ant-form-item-no-colon"
                              title="有效期"
                              >有效期</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <button
                                  id="create-share-form_isShareTermValidity"
                                  type="button"
                                  role="switch"
                                  aria-checked="false"
                                  class="ant-switch"
                                >
                                  <div class="ant-switch-handle"></div>
                                  <span class="ant-switch-inner"></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ant-form-item">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_isShareMark"
                              class="ant-form-item-no-colon"
                              title="添加水印"
                              >添加水印</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <button
                                  id="create-share-form_isShareMark"
                                  type="button"
                                  role="switch"
                                  aria-checked="false"
                                  class="ant-switch"
                                >
                                  <div class="ant-switch-handle"></div>
                                  <span class="ant-switch-inner"></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ant-form-item">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_isShareDownload"
                              class="ant-form-item-no-colon"
                              title="允许下载"
                              >允许下载</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <button
                                  id="create-share-form_isShareDownload"
                                  type="button"
                                  role="switch"
                                  aria-checked="true"
                                  class="ant-switch ant-switch-checked"
                                >
                                  <div class="ant-switch-handle"></div>
                                  <span class="ant-switch-inner"></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ant-form-item">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_isShareAnnotation"
                              class="ant-form-item-no-colon"
                              title="允许批注"
                              >允许批注</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <button
                                  id="create-share-form_isShareAnnotation"
                                  type="button"
                                  role="switch"
                                  aria-checked="true"
                                  class="ant-switch ant-switch-checked"
                                >
                                  <div class="ant-switch-handle"></div>
                                  <span class="ant-switch-inner"></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div class="share-operate">
                      <button
                        type="button"
                        class="ant-btn ant-btn-primary ant-btn-lg share-btn link-share"
                      >
                        <span role="img" class="anticon"
                          ><svg
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            focusable="false"
                            class=""
                          >
                            <use
                              xlink:href="#icon-vam-lianjie"
                            ></use></svg></span
                        ><span>通过链接分享</span></button
                      ><button
                        type="button"
                        class="ant-btn ant-btn-default ant-btn-lg share-btn weixin-share"
                      >
                        <span role="img" class="anticon"
                          ><svg
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            focusable="false"
                            class=""
                          >
                            <use
                              xlink:href="#icon-vam-weixin1"
                            ></use></svg></span
                        ><span>通过微信分享</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  tabindex="0"
                  aria-hidden="true"
                  style="
                    width: 0px;
                    height: 0px;
                    overflow: hidden;
                    outline: none;
                  "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>
<script>
import workbenchMenu from "@/components/layout/nav/workbenchMenu";
import { listJiaobenInfo, getJiaobenInfo, delJiaobenInfo, addJiaobenInfo, updateJiaobenInfo,getJiaobenList } from "@/utils/jiaobenInfo";
import crud from '/src/common/crud/crud';
import { getToken } from "@/utils/auth";
export default {
  name: "JiaobenInfo",
  mixins: [crud],
  components: { workbenchMenu, getToken },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 脚本库表格数据
      jiaobenInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        scriptName: null,
        userId: null,
        status: null,
        companyId: null,
        createOper: null,
        updateOper: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    baseInit(){
      this.url = '/module/quartz/sysjob';
      this.viewName = '创建脚本';
      return true;
    },
    /** 查询脚本库列表 */
    getList() {
      this.loading = true;
      getJiaobenList().then(response => {
        this.jiaobenInfoList = response.data;
        //this.total = response.total;
        //this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        scriptName: null,
        userId: null,
        delFlag: null,
        status: '1',//默认状态启用
        companyId: null,
        createTime: null,
        createOper: null,
        updateTime: null,
        updateOper: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    baseHandleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加脚本库";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getJiaobenInfo(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改脚本库";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateJiaobenInfo(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addJiaobenInfo(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除脚本库编号为"' + ids + '"的数据项？').then(function() {
        return delJiaobenInfo(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('hugai/jiaobenInfo/export', {
        ...this.queryParams
      }, `jiaobenInfo_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
