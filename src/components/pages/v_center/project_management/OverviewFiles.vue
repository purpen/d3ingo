<template>
  <section class="OverView-files">
    <div class="files-header">
       <span>项目概况</span>
       <i class="fx-icon-nothing-right"></i>
       <span>交付内容</span>
    </div>
    <div class="files-centent">
        <el-row>
          <el-col :span="12">
            <span class="fz-18 tc-2">外观设计</span>
          </el-col>
          <el-col :span="12">
            <div class="upload-file">
              上传文件
            </div>
          </el-col>
        </el-row>

        <div class="design-centent">
          1.	产品创意方案草图；
          2.	产品造型效果图；
          3.	产品配色方案；
          4.	产品丝印等工艺的矢量文件；
          5.	产品设计说明。
        </div>
        <ul class="file-list">
          <li>
            <img src="" alt="" class="other">
            <div class="file-details">
              <p>文件名</p>
              <div>
                <i class="time"></i>
                <span>2018-10-10</span>
                <i class="need"></i>
                <span>10kb</span>
              </div>
            </div>
            <div class="file-event">
              <span>分享</span>
              <span>下载</span>
              <span>删除</span>
            </div>
          </li>
        </ul>
    </div>
  </section>
</template>
<script>
export default {
  name: 'projectManagementOverViewFiles',
  data() {
    return {
      ceshi: '测试'
    }
  }
}
</script>
<style scope>
  .OverView-files {
    margin: 30px 100px 150px 100px;
  }
  .files-header {
    margin-bottom: 30px;
  }
  .files-header span{
    font-size: 16px;
  }
  .files-header i {
    display: inline-block;
    width: 16px;
    height: 16px;
    /* margin: 0 10px; */
    margin-right: 0;
    text-align: center;
  }
  .upload-file {
    text-align: right;
  }
  .design-centent {
    margin-top: 12px;
    padding: 20px 0px;
    border-top: 2px solid #e6e6e6;
  }
  .file-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    background: #f7f7f7;
    padding: 0px 30px;
  }
  .file-list li img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
  .file-details {
    flex: 1;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .file-details i {
    display: inline-block;
    height: 16px;
    width: 16px;
  }
  .file-details .time{
    background:url("../../../../assets/images/tools/project_management/Meeting_time@2x.png");
    background-size: contain;
  }
  .file-details .need {
    background:url("../../../../assets/images/tools/project_management/Need.png");
    background-size: contain;
  }
  .file-event span {
    margin-left: 20px;
  }
  .document{
    background: url('../../../../assets/images/tools/cloud_drive/type/document@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .other {
    background: url('../../../../assets/images/tools/cloud_drive/type/other@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .artboard {
    background: url('../../../../assets/images/tools/cloud_drive/type/artboard@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .audio {
    background: url('../../../../assets/images/tools/cloud_drive/type/audio@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .compress {
    background: url('../../../../assets/images/tools/cloud_drive/type/compress@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .folder {
    background: url('../../../../assets/images/tools/cloud_drive/type/folder@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .image {
    background: url('../../../../assets/images/tools/cloud_drive/type/image@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .powerpoint {
    background: url('../../../../assets/images/tools/cloud_drive/type/powerpoint@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .spreadsheet {
    background: url('../../../../assets/images/tools/cloud_drive/type/spreadsheet@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .video {
    background: url('../../../../assets/images/tools/cloud_drive/type/video@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
</style>
