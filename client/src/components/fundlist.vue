<template>
  <div class="fundlist">

    <div class="listhead">
      <!-- 日期筛选 -->
      <div class="filterdate">
        <span class="demonstration">日期筛选：</span>
        <el-date-picker @change="filterByDate()" v-model="filterTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <!-- 搜索 / 添加区域 -->
      <div class="add-new-item">
        <el-form>
          <el-form-item class="btnRight">
            <el-button type="primary" size='small' icon='view' @click="handleAdd()" :disabled="user.identity == 'administrator' ? false:true">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table-container">
      <el-table border :data="tableData" v-if="tableData.length>0" style="width: 100%">

        <el-table-column align="center" type="index">
        </el-table-column>

        <el-table-column prop="localdate" align="center" label="创建时间" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span :style="{marginLeft:'10px'}">{{scope.row.localdate }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="describe" align="center" label="收支类型" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.describe }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="income" align="center" label="收入" width="160">
          <template slot-scope="scope">
            <span style="color: #f40">{{ scope.row.income }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="expend" align="center" label="支出" width="160">
          <template slot-scope="scope">
            <span style="color: #04f">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="cash" align="center" label="交易方式" width="160">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="remark" align="center" label="备注" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button size="small" type="primary" :disabled="user.identity == 'administrator' ? false:true" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-s-open"></i>
              编辑</el-button>
            <el-button size="small" type="danger" :disabled="user.identity == 'administrator' ? false:true" @click="handleDelete(scope.$index, scope.row)">
              <i class="el-icon-delete-solid"></i>
              删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- 页码区域 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination align="right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.page_index" :page-sizes="pagination.page_sizes" :page-size="pagination.page_size" :layout=" pagination.layout" :total="pagination.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>

    </div>

    <Dialog :formData="formData" :dialog="dialog" @update="getProfile"></Dialog>

  </div>
</template>

<script>
import moment from '../utils/moment';
//使用moment.js及其本地化工具对ISODate("2019-05-01T17:03:49.664Z") 格式进行汉化修改
import Dialog from './dialog';

export default {
  name: "fundlist",
  data() {
    return {
      filterTime: {},
      //filterTime是时间选择器传过来的时间信息
      tableData: [],
      //tableData是渲染在页面中的信息
      allTableData: [],
      //allTableData 是经过时间选择器选择之后的全部数据
      reserveData: [],
      // reserveData 后端传过来的完整数据， 不要去改变他，用来清除筛选条件的，重新给allTableData赋值的
      filterDate: [],
      //allTableData 进行 filterDate 筛选 (根据页面展示条数等)
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      //dialog 对话框控制数据
      formData: {
        types: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: ""
      },
      // formData 表单填写在对话框的数据
      pagination: {
        page_index: 1,
        total: 0,
        page_size: 5,
        page_sizes: [5, 10, 15, 20],
        layout: "total, sizes, prev, pager, next, jumper"
      }
      //pagination 页面样式设置
    }
  },
  created() {
    //创建实例时执行数据请求
    this.getProfile()
  },
  computed: {
    //cong vueX 获取全局数据
    //用来判断操作权限
    //仅 administrator 有操作权限
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    // 获取全部流水数据
    getProfile() {
      this.$axios.get("/api/profiles/")
        .then(res => {
          var json = res.data.map((e) => {
            e.localdate = moment(e.date).format('YYYY-MMMM-Do HH:mm:ss');
            return e;
          })
          this.allTableData = json;
          this.reserveData = json;
          this.filterDate = json;
          this.setPagination();
        }).catch(err => {
          this.$message({
            message: '数据获取失败',
            type: "error"
          })
        })
    },
    //设置分页数据
    setPagination() {
      //分页属性
      this.pagination.total = this.allTableData.length;
      this.pagination.page_index = 1;
      this.pagination.page_size = 5;
      //tableData 数据设置
      this.tableData = this.allTableData.filter((ele, index) => {
        const psize = this.pagination.page_size, pindex = this.pagination.page_index;
        return (index < psize * pindex && index >= psize * (pindex - 1))
      })
    },
    //编辑某一条流水内容
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "编辑内容",
        option: "edit"
      };
      this.formData = {
        ...row
      }
    },
    //删除某一条流水内容
    handleDelete(index, row) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`)
        .then(res => {
          this.$message({
            message: '已经删除',
            type: "success"
          });
          this.getProfile();
        })
        .catch((err) => {
          this.$message({
            message: '删除失败',
            type: "error"
          });
        });
      this.dialog.show = false;
    },
    //添加一条流水内容
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加新的收支信息",
        option: "add"
      };
      this.formData = {
        types: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: ""
      }
    },
    //改变每页显示数量页面
    handleSizeChange(pSize) {
      this.pagination.total = this.allTableData.length;
      this.pagination.page_index = 1;
      this.pagination.page_size = pSize;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < pSize;
      });
    },
    //修改当前页码
    handleCurrentChange(curPage) {
      // 当前页
      let sortnum = this.pagination.page_size * (curPage - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.pagination.page_size;
      });
    },
    //设置修改筛选时间
    filterByDate() {
      if (this.filterTime) {
        this.allTableData = this.reserveData;
        var startTime = this.filterTime[0].getTime();
        var endTime = this.filterTime[1].getTime();
        this.filterDate = this.allTableData.filter((items, index) => {
          var time = new Date(items.date).getTime();
          return (time > startTime && time < endTime)
        })
        this.allTableData = [...this.filterDate];
        this.pagination.total = this.allTableData.length;
        this.pagination.page_index = 1;
        this.handleCurrentChange(1)
      } else {
        this.clearFilterByDate();
      }
    },
    //清除时间筛选条件
    clearFilterByDate() {
      this.filterTime = "";
      this.getProfile()
    }
  },
  components: {
    Dialog
  }
}

</script>

<style scoped>
.fundlist {
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
}
.listhead {
  position: relative;
  height: 80px;
}
.add-new-item,
.filterdate {
  position: absolute;
}

.filterdate {
  top: 23px;
  left: 30px;
}
.filter-date-btn {
  margin-left: 30px;
}
.add-new-item {
  top: 23px;
  float: right;
  right: 50px;
}

.pagination {
  padding-right: 40px;
  margin-top: 20px;
}
</style>