<template>
  <div :class="['menu', {'menu-mini' : !leftWidth}]">
    <!-- <h3><router-link class="clearfix" to="/vcenter/control"><i class="fx fx-icon-nothing-left"></i>设计云盘</router-link></h3> -->
    <el-collapse v-model="activeNames" class="cloud-menu">
      <el-collapse-item title="设计云盘" name="1">
        <ul class="cloud-classify">
          <li>
            <a :class="['files', {'active': isActive === 'all'}]" @click="changeTitle('all')">
              <span>全部文件</span>
            </a>
          </li>
          <li>
            <a :class="['project', {'active': isActive === 'project'}]" @click="changeTitle('project')">
              <span>项目</span>
              </a>
          </li>
          <li>
            <a :class="['recently', {'active': isActive === 'recently-use'}]" @click="changeTitle('recently-use')">
              <span>最近使用</span>
            </a>
          </li>
          <li>
            <a :class="['recycle', {'active': isActive === 'recycle'}]" @click="changeTitle('recycle')">
              <span>回收站</span>
            </a>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="项目" name="2">
      </el-collapse-item>
      <el-collapse-item title="文件类型" name="3">
        <ul class="cloud-classify">
          <li @click="changeTitle('1')">
            <a :class="['image', {'active': isActive === '1'}]">
              <span>图片</span>
            </a>
          </li>
          <li @click="changeTitle('2')">
            <a :class="['video', {'active': isActive === '2'}]">
              <span>视频</span>
            </a>
          </li>
          <li @click="changeTitle('3')">
            <a :class="['audio', {'active': isActive === '3'}]">
              <span>音频</span>
            </a>
          </li>
          <li @click="changeTitle('4')">
            <a :class="['document', {'active': isActive === '4'}]">
              <span>文档</span>
            </a>
          </li>
          <li @click="changeTitle('5')">
            <a :class="['spreadsheet', {'active': isActive === '5'}]">
              <span>电子表格</span>
            </a>
          </li>
          <li @click="changeTitle('6')">
            <a :class="['powerpoint', {'active': isActive === '6'}]">
              <span>演示文稿</span>
            </a>
          </li>
          <li @click="changeTitle('7')">
            <a :class="['artboard', {'active': isActive === '7'}]">
              <span>PDF</span>
              </a>
          </li>
          <!-- <li @click="changeTitle(0)">
            <a :class="['folder', {'active': isActive === '0'}]">
              <span>文件夹</span>
            </a>
          </li> -->
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  export default {
    name: 'cloud_drive_menu',
    props: {
      isActive: {
        default: 'all'
      }
    },
    data() {
      return {
        test: 'test',
        activeNames: ['1', '2', '3']
      }
    },
    methods: {
      changeTitle(name) {
        if (this.isActive !== name) {
          this.$emit('getTitle', name)
        } else {
          this.$emit('getTitle', name, 'local')
        }
        this.$router.push({name: this.$route.name, params: {modules: name}})
      }
    },
    computed: {
      leftWidth() {
        let leftWidth = this.$store.state.event.leftWidth
        if (leftWidth === 2) {
          return 0
        } else if (leftWidth === 4) {
          return leftWidth
        }
      }
    }
  }
</script>
<style scoped>
  .menu {
    transition: 0.2s all ease;
    max-width: 200px;
    height: calc(100vh - 60px);
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    /* background: #333; */
  }
  h3 {
    color: #666;
    font-size: 14px;
    line-height: 20px;
    height: 30px;
    border-bottom: 1px solid #D2D2D2;
  }
  h3 i {
    margin-right: 10px;
  }
  .cloud-classify {
    /* background: #333; */
  }
  .cloud-classify li {
    font-size: 0;
  }
  .cloud-classify li a {
    /* color: rgba(255, 255, 255, 0.5); */
    color: #999;
    display: block;
    position: relative;
    padding-left: 68px;
    cursor: pointer;
  }
  .cloud-classify li a:before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    left: 34px;
    top: 8px;
    background: url('../../../../../assets/images/tools/cloud_drive/file@2x.png') center no-repeat;
    background-size: contain
  }
  
  .cloud-classify li a.project:before {
    background: url('../../../../../assets/images/tools/cloud_drive/project@2x.png') center no-repeat;
    background-size: contain
  }
  
  .cloud-classify li a.recently:before {
    background: url('../../../../../assets/images/tools/cloud_drive/recently@2x.png') center no-repeat;
    background-size: contain
  }
  
  .cloud-classify li a.recycle:before {
    background: url('../../../../../assets/images/tools/cloud_drive/recycle@2x.png') center no-repeat;
    background-size: contain
  }

  .cloud-classify li a.image:before {
    background: url('../../../../../assets/images/tools/cloud_drive/type_menu/image@2x.png') 0 0 no-repeat;
    background-size: contain
  }

  .cloud-classify li a.artboard:before {
    background: url('../../../../../assets/images/tools/cloud_drive/type_menu/artboard@2x.png') 0 0 no-repeat;
    background-size: contain
  }

  .cloud-classify li a.document:before {
    background: url('../../../../../assets/images/tools/cloud_drive/type_menu/document@2x.png') 0 0 no-repeat;
    background-size: contain
  }

  .cloud-classify li a.spreadsheet:before {
    background: url('../../../../../assets/images/tools/cloud_drive/type_menu/spreadsheet@2x.png') 0 0 no-repeat;
    background-size: contain
  }

  .cloud-classify li a.powerpoint:before {
    background: url('../../../../../assets/images/tools/cloud_drive/type_menu/powerpoint@2x.png') 0 0 no-repeat;
    background-size: contain
  }

  .cloud-classify li a.folder:before {
    background: url('../../../../../assets/images/tools/cloud_drive/type_menu/folder@2x.png') 0 0 no-repeat;
    background-size: contain
  }

  .cloud-classify li a.video:before {
    background: url('../../../../../assets/images/tools/cloud_drive/type_menu/video@2x.png') 0 0 no-repeat;
    background-size: contain
  }

  .cloud-classify li a.audio:before {
    background: url('../../../../../assets/images/tools/cloud_drive/type_menu/audio@2x.png') 0 0 no-repeat;
    background-size: contain
  }
  

  .cloud-classify li span {
    font-size: 14px;
    line-height: 40px;
  }
  .cloud-classify li:hover a, .cloud-classify li a.active {
    /* background: rgba(255, 255, 255, 0.1); */
    background: #f7f7f7;
    color: #ff5a5f
  }
  .active {
    color: #ff5a5f
  }
  
  @media screen and (min-width: 1200px) {
    .menu {
      position: absolute;
      width: 100%;
      top: 0;
      left: 200px;
    }
    .menu-mini {
      left: 0;
      transition: 0.2s all ease;
    }
  }
  @media screen and (max-width: 767px) {
    .cloud-classify li a {
      padding: 0 0 0 30px;
    }
    .cloud-classify li a:before {
      left: 0
    }
  }
</style>
