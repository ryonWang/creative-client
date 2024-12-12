<template>
  <div class="knowledge-base">
    <!-- 顶部操作栏 -->
    <div class="operation-bar">
      <div class="left">
        <el-button type="primary" icon="el-icon-plus" @click="handleCreate">
          新建知识库
        </el-button>
        <el-button icon="el-icon-upload2" @click="handleImport">
          批量导入
        </el-button>
      </div>
      <div class="right">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索知识库"
          prefix-icon="el-icon-search"
          clearable
          style="width: 200px"
        ></el-input>
      </div>
    </div>

    <!-- 知识库列表 -->
    <div class="knowledge-list">
      <el-table
        :data="knowledgeList"
        style="width: 100%"
        border
      >
        <el-table-column
          prop="name"
          label="知识库名称"
          min-width="200">
        </el-table-column>
        
        <el-table-column
          prop="category"
          label="分类"
          width="120">
        </el-table-column>
        
        <el-table-column
          prop="documentCount"
          label="文档数量"
          width="100">
        </el-table-column>
        
        <el-table-column
          prop="lastUpdateTime"
          label="最后更新时间"
          width="180">
        </el-table-column>
        
        <el-table-column
          prop="status"
          label="状态"
          width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'active' ? 'success' : 'info'">
              {{ scope.row.status === 'active' ? '已启用' : '未启用' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column
          label="操作"
          width="250"
          fixed="right">
          <template slot-scope="scope">
            <el-button 
              type="text" 
              icon="el-icon-edit"
              @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button 
              type="text" 
              icon="el-icon-document"
              @click="handleManageDocuments(scope.row)">
              管理文档
            </el-button>
            <el-button 
              type="text" 
              icon="el-icon-delete"
              @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <!-- 新建/编辑知识库弹窗 -->
    <el-dialog
      :title="dialogType === 'create' ? '新建知识库' : '编辑知识库'"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <el-form :model="knowledgeForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="knowledgeForm.name" placeholder="请输入知识库名称"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="knowledgeForm.category" placeholder="请选择分类">
            <el-option label="产品介绍" value="product"></el-option>
            <el-option label="使用说明" value="manual"></el-option>
            <el-option label="常见问题" value="faq"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="knowledgeForm.description"
            :rows="3"
            placeholder="请输入知识库描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitKnowledge">确定</el-button>
      </div>
    </el-dialog>

    <!-- 导入文档弹窗 -->
    <el-dialog
      title="批量导入"
      :visible.sync="importDialogVisible"
      width="400px"
    >
      <el-upload
        class="upload-demo"
        drag
        action="/api/knowledge/import"
        multiple
        :on-success="handleUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">支持 PDF、Word、Excel 等格式文件</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'KnowledgeBase',
  data() {
    return {
      searchKeyword: '',
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      importDialogVisible: false,
      dialogType: 'create', // create or edit
      knowledgeForm: {
        name: '',
        category: '',
        description: ''
      },
      knowledgeList: [
        {
          id: 1,
          name: '产品功能介绍',
          category: '产品介绍',
          documentCount: 10,
          lastUpdateTime: '2024-01-20 15:30',
          status: 'active'
        }
        // 更多知识库数据...
      ]
    }
  },
  methods: {
    handleCreate() {
      this.dialogType = 'create';
      this.knowledgeForm = {
        name: '',
        category: '',
        description: ''
      };
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.dialogType = 'edit';
      this.knowledgeForm = { ...row };
      this.dialogVisible = true;
    },
    handleImport() {
      this.importDialogVisible = true;
    },
    handleManageDocuments(row) {
      console.log('管理文档:', row);
    },
    handleDelete(row) {
      this.$confirm('确认删除该知识库?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除知识库:', row);
        this.$message.success('删除成功');
      }).catch(() => {});
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    submitKnowledge() {
      console.log('提交知识库:', this.knowledgeForm);
      this.dialogVisible = false;
    },
    handleUploadSuccess(response) {
      this.$message.success('上传成功');
      this.importDialogVisible = false;
    },
    fetchData() {
      // 获取知识库列表数据
      console.log('获取数据:', this.currentPage, this.pageSize);
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
.knowledge-base {
  padding: 20px;

  .operation-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .left {
      display: flex;
      gap: 10px;
    }
  }

  .knowledge-list {
    margin-bottom: 20px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  :deep(.el-upload-dragger) {
    width: 100%;
  }
}
</style> 