<template>
  <div class="videoTab">
    <div class="tabSelect">
      <!-- <el-button @click="deletephoto()">删除摄像机</el-button> -->
      <el-button @click="addphoto()">增加摄像头</el-button>
      <el-button @click="changeName()">修改菜单名字</el-button>
      <el-button @click="open()">删除</el-button>
      <el-button @click="add()">增加菜单</el-button>
      <!-- <el-button @click="openphoto()">播放摄像头</el-button> -->
    </div>
    <div class="tabContent">
      <div class="tabLeft">
        <el-input
          placeholder="查询..."
          suffix-icon="el-icon-search"
          v-model="filterText">
        </el-input>
       <div class="tree">
        <el-tree
          :expand-on-click-node="false"
          class="filter-tree"
          show-checkbox
          highlight-current
          :default-expand-all="true"
          :check-strictly="true"
          :check-change="checkChange"
          :render-content="renderContent"
          :data="videoLeftData"
          :props="defaultProps"
          node-key="id"
          :filter-node-method="filterNode"
           @node-click="handleNodeClick"
           ref="tree">
          <!-- <span slot-scope="{ node , data }">
            <span @dblclick="clickNode(node,data)" >{{node.label}}</span>
          </span> -->
        </el-tree>
      </div>
          <el-dialog title="添加菜单"
              :visible.sync="dialogVisible"
              >
            <el-form ref="form">
                <!-- <el-form-item label="节点父类型">
              <el-select placeholder="请选择要添加节点的父节点" v-model="myName" @change="selectChange" >
                <el-option label="根节点" :value="0"></el-option>
                <el-option v-for="item in videoLeftData" :label="item.label" :value="item.label"  :key="item.index"></el-option>
              </el-select>
            </el-form-item> -->
                <el-form-item label="节点名称">
                  <el-input placeholder="请输入节点名称" v-model="myLabel" style="width: 220px"></el-input>
                </el-form-item>
          </el-form>
      
            <span>
              <el-button @click="cancleSaveNode">
                取消
              </el-button>
              <el-button @click="saveNode">
                确定
              </el-button>
            </span>
      
          </el-dialog>

          <el-dialog title="修改名字"
              :visible.sync="dialogVisible2"
              >
            <el-form ref="form">
                <!-- <el-form-item label="旧菜单名字">
              <el-select placeholder="请选择要改变的菜单的名字" v-model="oldName" @change="selectChange" >
                <el-option label="菜单名称" :value="0"></el-option>
                <el-option v-for="item in videoDataArr" :label="item" :value="item"  :key="item.index"></el-option>
              </el-select>
            </el-form-item> -->
                <el-form-item label="新菜单名字">
                  <el-input placeholder="请输入新菜单名字" v-model="newName" style="width: 220px"></el-input>
                </el-form-item>
          </el-form>
      
            <span>
              <el-button @click="cancleSaveNode">
                取消
              </el-button>
              <el-button @click="saveNode2">
                确定
              </el-button>
            </span>
      
          </el-dialog>

      
          <el-dialog title="添加摄像头"
              :visible.sync="dialogVisible3"
              >
            <el-form ref="form" >
                <!-- <el-form-item label="父节点名称" class="add">
              <el-select placeholder="请选择要增加摄像头的父节点名称" v-model="oldName" @change="selectChange" >
                <el-option label="父节点名称" :value="0" class="photoform"></el-option>
                <el-option v-for="item in videoDataArr" :label="item" :value="item"  :key="item.index"></el-option>
              </el-select>
            </el-form-item> -->
            <el-input
            class="add"
            suffix-icon="el-icon-search"
            placeholder="搜索"
            v-model="filterText2">
            </el-input>
              <el-table
                height="528"
                :data="tables"
                :header-cell-style="{background:'#304456',color:'#FFF0F5'}"
                style="width: 100% "
                :cell-style="tableCellStyle"
                @selection-change="handleSelectionChange"
                ref="multipleTable"
                :default-sort = "{prop: 'index', order: 'ascending'}"
                >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="index"
                  label="#"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="资产（分组）编码"
                  sortable
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="video_name"
                  label="资产（分组）名称"
                  sortable
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="pid"
                  label="父资产（分组）id"
                  sortable
                  :formatter="formatter">
                </el-table-column>
              </el-table>
              <el-pagination
                background
                layout="total, prev, pager, next"
                :pager-count="5"
                @current-change="current_change"
                :total=totalNumber>
              </el-pagination>
          </el-form>
      
            <span>
              <el-button @click="cancleSaveNode">
                取消
              </el-button>
              <el-button @click="dialogFormAdd">
                添加
              </el-button>
            </span>
      
          </el-dialog>

          
      </div>
      <!-- <div class="tabLeft">
        <el-row class="tac">
          <el-col :span="12"> -->
            <!-- <h5>默认颜色</h5> -->
            <!-- <el-menu> -->
              <!-- 第一层导航 -->
              <!-- <el-submenu index="1" v-for="(item) in videoLeftData" :key="item.id">
                <template slot="title">
                  <i class="el-icon-video-camera"></i>
                  <span>{{item.title}}</span>
                </template> -->
                <!-- 第二层导航 -->
                <!-- <el-submenu :index="itemItem.index" v-for="(itemItem) in item.children" :key="itemItem.id">
                  <template slot="title">{{itemItem.title}}</template>
                  <el-menu-item :index="'/' + ItemChildrens.path" v-for="(ItemChildrens) in itemItem.children" :key="ItemChildrens.id" @click="toPath(ItemChildrens)">{{ItemChildrens.title}}</el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div> -->
      <div class="tabRight">
        <!-- <div class="tabRight_header"> </div> -->
        <!-- <div class="tabRight_content" id="tabRight_content">
          <div class="big"></div>
          <div class="small"></div>
          <div class="small"></div>
          <div class="small"></div>
          <div class="small"></div>
          <div class="small"></div>
          <div class="small"></div>
          <div class="small"></div>
          <div class="small"></div> -->
          <!-- 显示的页面 -->
          <div class="content" id="content">
          <v-vidoe :videojs-data="videojsData"></v-vidoe>
          <!-- <router-view></router-view> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from './videoJsView'
  export default {
    components:{
      'v-vidoe':videojs
    },
    data(){
      return{
        filterText: '',
        filterText2: '',
        dialogVisible:false,
        dialogVisible2:false,
        dialogVisible3:false,
        myLabel:null,
        myName:null,
        newName:null,
        oldName:null,
        oldId:null,
        chooseNode:[],
        videoDataArr:[],
        multipleTable: [],
        tableData:[],
        oldMenuId:[],
        tableDataArr:[],
        currentPage:1,//默认开始页面
        totalNumber:'',
        videoLeftData:[],
        defaultProps: {
            children: 'children',
            label: 'name'
          },
       videoLeftData2:[
          {
            label: '监控点管理中心',
            path: 'single',
            id: 101,
            pId:0,
            index:'1',
            children:[
              {
                label: '监控点1',
                path: 'singleItemq',
                id: 1011,
                pId:1,
                index:'1-1',
                children:[
                  {
                    label: 'xxx000xxx',
                    path: 'singleItemq',
                    videoSrc: [
                      {
                        src:'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',
                        id:202000,
                      }
                    ],
                    id: 10111,
                    tag:1,
                  },
                  {
                    label: 'xxx111xxx',
                    path: 'singleItemw',
                    videoSrc: [
                      {
                        src:'http://ivi.bupt.edu.cn/hls/cctv5phd.m3u8',
                        id:202001
                      }
                    ],
                    id: 10222,
                    tag:1,
                  },
                  {
                    label: 'xxx222xxx',
                    path: 'singleIteme',
                    videoSrc: [
                      {
                        src:'http://live.streamingfast.net/osmflivech4.m3u8',
                        id:202002
                      }
                    ],
                    id: 10333,
                    tag:1,
                  }
                ]
              },
              {
                label: '监控点2',
                path: 'singleItemfourq',
                id: 2011,
                index:'1-2',
                children:[
                  {
                    label: 'xxx000xxx',
                    path: 'singleItemfourq',
                    id: 20111,
                    videoSrc:[
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202003
                      },
                      {
                        src: 'http://d2e6xlgy8sg8ji.cloudfront.net/liveedge/eratv3/playlist.m3u8',
                        id: 202004
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202005
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202006
                      },
                    ],
                    tag:2,
                  },
                  {
                    label: 'xxx111xxx',
                    path: 'singleItemfourw',
                    id: 20222,
                    videoSrc:[
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202009
                      },
                      {
                        src: 'http://d2e6xlgy8sg8ji.cloudfront.net/liveedge/eratv3/playlist.m3u8',
                        id: 202010
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202011
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202013
                      },
                    ],
                    tag:2,
                  },
                ]
              },
              {
                label: '监控点3',
                path: 'singleItemeightw',
                id: 3011,
                index:'1-3',
                children:[
                  {
                    label: 'xxx000xxx',
                    path: 'singleItemeightw',
                    id: 30111,
                    videoSrc:[
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202029
                      },
                      {
                        src: 'http://d2e6xlgy8sg8ji.cloudfront.net/liveedge/eratv3/playlist.m3u8',
                        id: 202030
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202031
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202032
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202033
                      },
                      {
                        src: 'http://d2e6xlgy8sg8ji.cloudfront.net/liveedge/eratv3/playlist.m3u8',
                        id: 202034
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202035
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202036
                      },
                    ],
                    tag:3,
                  },
                  {
                    label: 'xxx111xxx',
                    path: 'singleItemeightq',
                    id: 30222,
                    videoSrc:[
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202039
                      },
                      {
                        src: 'http://d2e6xlgy8sg8ji.cloudfront.net/liveedge/eratv3/playlist.m3u8',
                        id: 202040
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202041
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202042
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202043
                      },
                      {
                        src: 'http://d2e6xlgy8sg8ji.cloudfront.net/liveedge/eratv3/playlist.m3u8',
                        id: 202044
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202045
                      },
                      {
                        src: 'http://61.216.177.73/sta/ch1764025.m3u8',
                        id: 202046
                      },
                    ],
                    tag:3,
                  }

                ]
              }
            ]
          },
        ],
        selectNode:[],
        selectNodeArr:[],
        selectNodeArr2:[],
        selectNum:0,
        selectNum2:0,//判断双击事件
        videojsData:{},

        
      }
    },
    computed:{
      tables:function(){
        var search=this.filterText2;
        // if(search){
        //   return  this.tableData.filter(function(dataNews){
        //     return Object.keys(dataNews).some(function(key){
        //       return String(dataNews[key]).toLowerCase().indexOf(search) > -1
        //     })
        //   })
        // }
        let _this = this
        if(search){
           this.$http
                .get(baseUrl+"//video/selectLike?videoName="+search)
                .then(res => {
                  console.log(res)
                  if(res.data.code == 0){
                     _this.tableData = res.data.body
                  }
                })
        }
        this.filterText2 = ''
        return this.tableData
        
      }
    },
    // computed:{
    //   tables:function () {
    //     var search=this.filterText2;
    //     console.log(search)
    //   }
    // },
    methods:{
      init(){
             this.$http
                .get(baseUrl+"/menusAndVideos/getAllInfo")
                .then(res => {
                  console.log(res)
                  if(res.data.code == 0){
                    this.videoLeftData = res.data.body
                  }
                })
                .catch(() => {
                    this.$Message.warning("请求菜单树列表失败");
                });
              this.$http
                .get(baseUrl+"/video/selectAll?currPage=1&pageSize=10")
                .then(res => {
                  console.log(res)
                    if(res.data.code == 0){
                        for(let i in res.data.body.videoList){
                          let index = 'index'
                          res.data.body.videoList[i][index] = i
                        }
                        this.tableData = res.data.body.videoList
                        this.totalNumber = res.data.body.count
                    }
                    })
                  .catch(() => {
                        this.$Message.warning("获取摄像头模型失败");
                    });
           },
      current_change:function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage)
        this.$http
            .get(baseUrl+"/video/selectAll?currPage="+this.currentPage+"&pageSize=10")
            .then(res => {
              console.log(res)
              if(res.data.code == 0){
                  for(let i in res.data.body.videoList){
                      let index = 'index'
                      res.data.body.videoList[i][index] = i
                      }
                      this.tableData = res.data.body.videoList
                      this.totalNumber = res.data.body.count
                   }
                  })
              .catch(() => {
                    this.$Message.warning("获取摄像头模型失败");
                    });
      },
      tableCellStyle () {
          return 'border-bottom: red;'
        },
      renderContent(h, { node, data, store }) {
          return(<span class="ziti" style="font-size:12px">{node.label}</span>)
        },
      formatter(row, column) {
        return row.pid;
      },
      handleSelectionChange(val) {

        this.multipleTable =  JSON.parse(JSON.stringify(val).replace(/video_name/g,"name"));;               //  this.multipleTable 选中的值
        console.log(this.multipleTable);
      },
      dialogFormAdd() {
        let checkkeys = this.$refs.tree.getCheckedKeys();
        console.log(checkkeys)
        var halo = [];
        for (let i = 0; i < this.multipleTable.length; i++) {
          let multipleTables = JSON.parse(JSON.stringify(this.multipleTable[i]).replace(/name/g,"video_name"));;
          delete multipleTables.id
          delete multipleTables.index
          delete multipleTables.pid
          halo.push(multipleTables);
        }
         let checkkey = checkkeys[0]
        let params = {
           "menuId": checkkey,
           "videoList":halo
        }
        console.log(params)
         this.$http
           .post(baseUrl+"/video/insertVideos", JSON.stringify(params),{
             headers:{
               'Content-Type':'application/json;charset=UTF-8'
             }
           })
           .then(res => {
             console.log(res)
             if(res.data.code == 0){
               //寻找id为checkkey的监控点，并把摄像头放进他的children里面
              let treeData = this.videoLeftData;
              let idArr = []
              let _this = this
              function getId(treeData, arr) {
                treeData.forEach(ele => {
                  if(ele.id == checkkey){
                    if( ele.children){
                      for(let i in _this.multipleTable){
                         ele.children.push(_this.multipleTable[i])
                      }
                      
                    }else{
                       ele.children=[];
                       ele.children =_this.multipleTable;
                    }
                  }
                  // 判断有子元素,并且id不等于checkkey就再次调用自身
                  if (ele.children && ele.id!=checkkey) {
                     getId(ele.children, arr)
                  }
                })
              }
              getId(treeData, idArr)
              console.log(treeData)
             }
              })
          //  .catch(() => {
          //      this.$Message.warning("添加摄像头模型失败");
          //  });
           this.dialogVisible3 = false;
        },
      selectChange(){},
      cancleSaveNode(){
        this.dialogVisible = false;
        this.dialogVisible2 = false;
        this.dialogVisible3 = false;//添加摄像头
      },
      changeName(){
        this.newName = '';
        let checkkeys = this.$refs.tree.getCheckedKeys();
        console.log(checkkeys)
        if(checkkeys.length > 1){
          this.$message.error("请只选择一个节点")
        }else{
          this.dialogVisible2 = true;
        }
        // let treeData = this.videoLeftData;
        // let idArr = []
        // let _this = this
        // function getId(treeData, arr) {
        //   treeData.forEach(ele => {
        //     if( ele.id==checkkeys[0]){
        //       _this.oldName = ele.name
        //     }
        //     // 判断有子元素,并且元素id不等于所选择的节点的id就再次调用自身
        //     if (ele.children && ele.id!=checkkeys[0]) {
        //        getId(ele.children, arr)
        //     }
        //   })
        // }
        // getId(treeData, idArr)

        
      },
      saveNode(){
        console.log(this.myLabel)
        console.log(this.oldMenuId)
        let _this = this
        let params = {
          name:this.myLabel,
          parentId: this.oldMenuId
        }
       this.$http
            .post(baseUrl+'/menu/insertNode',JSON.stringify(params),{
              headers:{
                'Content-Type':'application/json;charset=UTF-8'
              }
            })
            .then(res =>{
              console.log(res)
              if(res.data.code == 0){
               _this.$http
                .get(baseUrl+"/menusAndVideos/getAllInfo")
                .then(res => {
                  console.log(res)
                  if(res.data.code == 0){
                    _this.videoLeftData = res.data.body
                    _this.$message({
                        type: 'success',
                        message: '增加成功!'
                      });
                  }
                })
                
                }
            })
        
        this.dialogVisible = false;
      },
      saveNode2(){
        console.log(this.oldName)
        console.log(this.newName)
        let checkkeys = this.$refs.tree.getCheckedKeys();
        console.log(checkkeys);
        let checkkey = checkkeys[0];
        let params = {
          id:checkkey,
          name:this.newName
        }
        this.$http
        .post(baseUrl+'/menu/updateMenuName',JSON.stringify(params),{
          headers:{
                'Content-Type':'application/json;charset=UTF-8'
              }
        })
        .then(res=>{
          console.log(res)
          let treeData = this.videoLeftData;
          let idArr = []
          let _this = this
          function getId(treeData, arr) {
            treeData.forEach(ele => {
              if( ele.id==checkkey){
               ele.name = _this.newName
              }
              // 判断有子元素,并且元素id不等于所选择的节点的id就再次调用自身
              if (ele.children && ele.id!=checkkey) {
                getId(ele.children, arr)
              }
            })
          }
          getId(treeData, idArr)
          })
        
        for(let z in this.videoDataArr){
          if(this.videoDataArr[z] == this.oldName){
            this.videoDataArr[z] = this.newName
          }
        }
        this.oldName = null;
        this.dialogVisible2 = false;
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      open() {
        let idArr = []
        let _this = this
        let checkkeys = this.$refs.tree.getCheckedKeys();
        console.log(checkkeys)
        let treeData2 = this.videoLeftData;
        function getId2(treeData2, arr) {
            treeData2.forEach(ele => {
              if( ele.id == checkkeys[0]){
                _this.chooseNode = []
                _this.chooseNode = ele
              }
              // 判断有子元素,并且元素id不等于所选择的节点的id就再次调用自身
              if (ele.children && ele.id!=checkkeys[0]) {
                getId2(ele.children, arr)
              }
            })
          }
        getId2(treeData2, idArr)
        console.log(this.chooseNode)

        this.$http
          .get(baseUrl+"/video/getAllVideos")
          .then(res => {
            console.log(res)
              if(res.data.code == 0){
                this.tableDataArr = res.data.body
                let treeData  =  this.tableDataArr
               if(checkkeys.length <= 0){
                 this.$message.error("请至少选择一项");
               }else if(checkkeys.length > 1){
                 this.$message.error("请只选择一个节点进行删除");
               }
              
              //判断所要删除的节点下面是否有摄像头的id
              // else if(treeData.some(item =>{
              //    return  item.pid == checkkeys[0]
              // })){
              //   _this.$message.error("下面有摄像头，不能删除")
              // }
              else if(this.chooseNode.children){
                 this.$http
                 .get(baseUrl+'/menu/ifHave/'+checkkeys[0])
                 .then(res=>{
                   console.log(res)
                   if(res.data.code == 1){
                     this.$message.error("当前菜单下面有摄像头，不能删除");
                   }
                   else{
                     _this.delete2(checkkeys);
                   }
                 })
              }
              else{
                _this.delete2(checkkeys);
              }
          
               }
            })
      },
      addphoto(){
        this.multipleTable = [];
        this.$http
            .get(baseUrl+"/video/selectAll?currPage=1&pageSize=10")
            .then(res => {
              console.log(res)
              if(res.data.code == 0){
                for(let i in res.data.body.videoList){
                   let index = 'index'
                    res.data.body.videoList[i][index] = i
                   }
                   this.tableData = res.data.body.videoList
                   this.totalNumber = res.data.body.count
                    }
                    })
              .catch(() => {
                    this.$Message.warning("获取摄像头模型失败");
                  });
        let checkkeys = this.$refs.tree.getCheckedKeys();
        console.log(checkkeys)
        if(checkkeys.length > 1){
          this.$message.error('请只选择一个添加节点')
        }else if(checkkeys.length == 0){
          this.$message.error('还未选择需要添加摄像头的节点')
        } else{
           this.dialogVisible3 = true;
        }
      },
      delete2(checkkeys){
        console.log(this.selectNodeArr)
        // let checkkeys = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        if(checkkeys.length > 1){
          this.$message.error("请只选择一项进行删除")
        }
        // else if(this.selectNodeArr.children){
        //    let treeData = this.selectNodeArr.children;
        //         let idArr = []
        //         let _this = this
        //         function getId2(treeData, arr) {
        //           treeData.forEach(ele => {
        //               for(let  i in  _this.tableDataArr ){
        //                 if(ele.id == _this.tableDataArr[i].id){
        //                   _this.$message.error("下面有摄像头，不能删除")
        //                   continue;
        //                 }else if(ele.children){
        //                   getId2(ele.children, idArr)
        //                 }
        //               }
        //              })
        //               }
        //   getId2(treeData, idArr)
        // }
        else{
        
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
          }).then(()=>{
         let _this = this
         console.log(checkkeys)
         this.$http
            .get(baseUrl+'/menu/deleteMenu/'+checkkeys[0])
            .then(res =>{
              console.log(res)
              if(res.data.code == 0){
                let treeData = this.videoLeftData;
                let idArr = []
                let _this = this
                function getId(treeData, arr) {
                  treeData.forEach(ele => {
                    if(ele.id == checkkeys[0]){
                      ele = null;
                    }else{
                      for(let  i in ele.children){
                        if(ele.children[i].id == checkkeys[0]){
                          ele.children.splice(i,1)
                        }else if(ele.children[i].id != checkkeys[0] && ele.children[i].children.length > 0){
                          getId(ele.children, idArr)
                        }
                      }
                    }
                     })
                      }
                getId(treeData, idArr)
                this.$message({
                  type:'success',
                  message:'删除成功！'
                });
                   }
                     })
        // this.$http
        //         .get(baseUrl+"/menusAndVideos/getAllInfo")
        //         .then(res => {
        //           console.log(res)
        //           if(res.data.code == 0){
        //             this.videoLeftData = res.data.body
        //             this.$message({
        //                 type: 'success',
        //                 message: '删除成功!'
        //               });
        //           }
        //         })
         }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
          }
        // console.log(checkkeys)
      
      },
      add(){
        this.myLabel = '';
        let checkkeys = this.$refs.tree.getCheckedKeys();
        // if(checkkeys.length == 0){
        //   this.$message.error('请选择一个节点进行添加')
        // }else
        if(checkkeys.length > 1){
          this.$message.error('请只选择一个节点进行添加')
        }else{
        let treeData = this.videoLeftData;
        let idArr = [];
        this.oldMenuId = []
        let _this = this;
        if(checkkeys.length == 0){
          this.oldMenuId = 0
        }
        function getId4(treeData, arr) {
          treeData.forEach(ele => {
            //将当前选中的节点作为添加的父节点
              if (ele.children && ele.id == checkkeys[0]) {
                _this.oldMenuId = ele.id
              }else{
                getId4(ele.children, arr)
              }
                })
              }
          getId4(treeData, idArr)
          console.log(this.oldMenuId)
          this.dialogVisible = true;
      }
      },
      //  handleNodeClick(data,node){
      //   this.selectNode = this.$refs.tree.getNode(node);
      //   this.toPath(this.selectNode.data)
      //   },
      openphoto(){
        console.log(this.selectNodeArr)
        if(this.selectNodeArr.length == 0){
          this.$message.error("请至少添加一台摄像头")
        }else{
          this.toPath(this.selectNodeArr)
        }
      },
      handleNodeClick(item,node,self){
        this.selectNum ++ ;  //300ms之内这个数值变化则说明这个节点被双击
        this.selectNum2 ++ ; //每次进行定时操作，看看是否满足双击的操作
        this.selectNodeArr = item
        console.log(this.selectNodeArr)
        this.selectNode = item.id;
        this.$refs.tree.setCheckedKeys([item.id])
        if(this.selectNum2 == 1){
          setTimeout(()=>{
             this.judge();
             console.log(222)
          },300)
        }
        this.selectNum2 = 0 ;
        },
      judge(){
        if(this.selectNum == 2){
          this.selectNum = 0 ;
          this.openphoto();
        }else{
          this.selectNum = 0 ;
        }
      },
      checkChange(item,node,self){
         if(node == true){
           this.selectNode = item.id;
           this.$refs.tree.setCheckedKeys([item.id])
         }else{
           if(this.selectNode = item.id){
             this.$refs.tree.setCheckedKeys([item.id])
           }
         }
        
      },
      toPath(item){

        //拿到数据 赋值并传递到子组件
        this.videojsData = item
        // document.getElementById("content").style.display = 'flex';
        // document.getElementById("tabRight_content").style.display = 'none';

        /* let str = JSON.stringify(this.videosObj)
        console.log(str,'string') */
        /* this.$router.push({
          name: item.path,
          params: {videoSrcs:item.videoSrc}
        }) */
      },
      deletephoto(){}
    },
    mounted(){
            this.init();
        },
    watch:{
       filterText(val) {
        this.$refs.tree.filter(val);
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/style/themes/mixin';
  .videoTab {
    .el-input {
      width: 100%;
      font-size: 14px;
      display: inline-block;
      background-color: rgb(48,68,86);
      height: 30px;
    }
    .el-tree{
      background-color:transparent;
      margin-top: 15px;
      height: 40vw;
      width: 13vw;
      color: whitesmoke;
    }
    .el-tree-node__label{
      font-size: 16px;
      margin-top:5px;
    }
    .el-table{
      height: 16vw;
      margin-top: 10px;
      overflow-y: auto;
      border: #3D8C9F ;
      background-color: transparent;
    }
    .el-table tr{
      background-color: #273244;
      color: whitesmoke;
      align-items: center;
      border-color:rgb(61,140,159) ;
    }
    .el-table__empty-block {
      background-color: #273244;
    }
    .el-table__body tr.current-row>td{
      background-color: transparent !important;
      color: #fff;
    }
    .el-table__body-wrapper{
      background-color: #273244 !important;
    }
    .el-table__row>td{
      border-color: rgb(61,140,159);
    }
    .add.el-form-item{
      width: 400px;
      margin-left: 60px;
      float: left;
    }
    .add.el-input{
      width: 200px;
    }
    .el-tree-node__content{
      margin-top: 13px;
    }
    .el-table__body tr:hover>td{
      background-color: rgb(85,105,119)!important;
    }
    .el-table::before {
      //去掉最下面的那一条线
      height: 0px;
    }
    .el-table th.is-leaf{
      border-bottom: 0px solid transparent;
      border-right: 0px solid transparent;
    }
    .el-tree-node.is-current > .el-tree-node__content {
      background-color: transparent !important;
    }
    .el-tree-node__content:active{
      background-color: transparent !important;
    }
    .el-tree-node .is-focusable:active{
      background-color: transparent !important;
    }
    .el-tree-node:focus>.el-tree-node__content{
      background-color: transparent !important;
    }
    .el-tree-node__content:hover{
      background-color: transparent;
    }
    .ziti:hover{
      background-color: #3D8C9F;
      border-radius: 3px;
    }
    .el-button{
      margin-top: 4px;
      background-color: transparent;
      height: 33px;
      border-color: #66E0FE;
      font-size: 16px;
      padding: 2px 5px;
      /*color: white;*/
      @include themeify {
        color: themed('color');
      }
    }
    .el-input__inner{
      background-color: #304456;
      border-color: #3D8C9F;
      height: 35px;
      color: #3D8C9F;
    }
    .el-dialog{
      background:url("../../assets/image/video/tabLeft.png") no-repeat;
      background-size: 100% 100%;
    }
    .el-dialog__title{
      color: white;
    }
    ::-webkit-scrollbar{
      width: 14px;
      height: 14px;
    }
    .tree::-webkit-scrollbar-thumb {
      background-color: #0771BE !important;
      border-radius: 10px;
    }
    .tree::-webkit-scrollbar-track {
      background-color: rgba(31,95,54,0.1) !important;
      border-radius: 10px;
      box-shaddow:inset 0 0 5px rgba(0,0,0,0.2)
    }
    .el-pagination__total{
      color: whitesmoke;
    }
    .el-pagination{
      margin-top: 5px;
    }
    .el-table th{
      background-color: transparent;
    }
    .el-message-box{
      background: url("../../assets/image/video/tabLeft.png") no-repeat;
    }
    .el-message-box__title {
      color: white;
    }
    .el-message-box__message{
      color: white;
    }
  }
</style>
<style lang="scss" scoped>
  .videoTab{
    width: 100%;
    height: 100%;
    .tabContent{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      margin-top: 3px;
      display: flex;
      .tabLeft{
        height: 100%;
        border-right: 7px solid #296A88;
        background: url("../../assets/image/video/tabLeft.png") no-repeat;
        .tree {
          overflow-y:auto;
          overflow-x: auto;
        }
      }
      .tabRight{
        height: 100%;
        width: 87%;
        .tabRight_content{
          height: 100%;
          width: 87%;
          margin-left: 15px;
          .big{
            width: 42vw;
            height: 29.5vw;
            border: 3px solid white;
            float: left;
          }
          .small{
            height: 14.8vw;
            width: 21vw;
            border: 3px solid white;
            float: left;
          }
        }
      }
    }
  }
</style>
