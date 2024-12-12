<template>
  <div class="drafts">
    <!-- 顶部操作栏 -->
    <div class="operation-bar">
      <div class="left">
        <el-button-group>
          <el-button 
            :type="viewMode === 'grid' ? 'primary' : ''" 
            icon="el-icon-s-grid"
            @click="viewMode = 'grid'"
          >网格视图</el-button>
          <el-button 
            :type="viewMode === 'list' ? 'primary' : ''" 
            icon="el-icon-menu"
            @click="viewMode = 'list'"
          >列表视图</el-button>
        </el-button-group>
      </div>
      <div class="right">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索草稿"
          prefix-icon="el-icon-search"
          clearable
          style="width: 200px"
        ></el-input>
      </div>
    </div>

    <!-- 网格视图 -->
    <div v-if="viewMode === 'grid'" class="grid-view">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in draftsList" :key="item.id">
          <el-card class="draft-card" shadow="hover">
            <div class="draft-preview">
              <img :src="item.cover" :alt="item.title">
              <div class="draft-type">{{ item.type }}</div>
            </div>
            <div class="draft-info">
              <h3 class="draft-title">{{ item.title }}</h3>
              <div class="draft-time">
                <i class="el-icon-time"></i>
                {{ item.updateTime }}
              </div>
            </div>
            <div class="draft-actions">
              <el-button type="text" @click="handleEdit(item)">
                <i class="el-icon-edit"></i> 继续编辑
              </el-button>
              <el-button type="text" @click="handleDelete(item)">
                <i class="el-icon-delete"></i> 删除
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 列表视图 -->
    <div v-else class="list-view">
      <el-table
        :data="draftsList"
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="标题"
          min-width="200">
          <template slot-scope="scope">
            <div class="draft-title-cell">
              <el-image
                :src="scope.row.cover"
                :preview-src-list="[scope.row.cover]"
                fit="cover"
                class="draft-thumbnail"
              ></el-image>
              <span>{{ scope.row.title }}</span>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column
          prop="type"
          label="类型"
          width="120">
        </el-table-column>
        
        <el-table-column
          prop="updateTime"
          label="最后修改时间"
          width="180">
        </el-table-column>
        
        <el-table-column
          label="操作"
          width="200"
          fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">继续编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
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
        :page-sizes="[12, 24, 36, 48]"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drafts',
  data() {
    return {
      viewMode: 'grid',
      searchKeyword: '',
      pageSize: 12,
      total: 0,
      draftsList: [
        {
          id: 1,
          title: '产品演示草稿',
          cover: 'path/to/cover1.jpg',
          type: '视频草稿',
          updateTime: '2024-01-20 15:30'
        }
        // 更多草稿数据...
      ]
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    handleEdit(item) {
      console.log('编辑草稿:', item);
    },
    handleDelete(item) {
      this.$confirm('确认删除该草稿?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('删除草稿:', item);
        this.$message.success('删除成功');
      }).catch(() => {});
    },
    fetchData() {
      // 获取草稿列表数据
      console.log('获取数据:', this.currentPage, this.pageSize);
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
.drafts {
  padding: 20px;

  .operation-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .grid-view {
    .draft-card {
      margin-bottom: 20px;

      .draft-preview {
        position: relative;
        height: 160px;
        overflow: hidden;
        border-radius: 4px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .draft-type {
          position: absolute;
          left: 8px;
          top: 8px;
          padding: 2px 6px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          border-radius: 2px;
          font-size: 12px;
        }
      }

      .draft-info {
        padding: 12px 0;

        .draft-title {
          margin: 0 0 8px;
          font-size: 14px;
          font-weight: 500;
        }

        .draft-time {
          color: #999;
          font-size: 12px;
          
          i {
            margin-right: 4px;
          }
        }
      }

      .draft-actions {
        display: flex;
        justify-content: space-around;
        padding-top: 10px;
        border-top: 1px solid #eee;
      }
    }
  }

  .list-view {
    .draft-title-cell {
      display: flex;
      align-items: center;
      gap: 10px;

      .draft-thumbnail {
        width: 60px;
        height: 40px;
        border-radius: 4px;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style> 