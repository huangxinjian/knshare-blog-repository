<template>
    <div style="height:600px;">
        <div class="Header">
            <img class="menuImg" src="../../assets/images/logo-blue.png" @click="goToBlogMain">
            <div style="display:inline-block;margin-left: 87px;">
                <label style="font-size:15px;color:#1a2a3a;">编辑器类型：</label>
                <Select v-model="editorType" style="width:150px;margin-left:8px;">
                    <Option value="richText">富文本编辑器</Option>
                </Select>  
            </div>
            
            <Icon   type="md-more" 
                    style="float:right;cursor:pointer; margin: 16px 51px;" 
                    size="30" color="#1a2a3a"
                    @click="showOtherMenuFunc" v-clickoutside="hideOtherMenu"/>
            <transition name="fade">
                <div class="otherMenu" v-if="showOtherMenu" >
                        <ul>
                            <li @click="hideDraft">写博客</li>
                            <li @click="showDraft">草稿箱</li>
                            <li @click="goBloggerBlogList">个人主页</li>
                            <li>文章管理</li>
                        </ul>
                </div>
            </transition>

            <Button type="primary" v-if="this.$store.state.editorArticle.articleId == '' && hideDraftMenu" style="float:right;margin: 14px 0 0 0;" @click="showPublishBlogModal">发布博文</Button>
            <Button type="error" v-else-if="this.$store.state.editorArticle.articleId != '' && hideDraftMenu" style="float:right;margin: 14px 0 0 0;" @click="confirmUpdate">确认更改</Button>

            <Button type="success" style="float:right;margin: 14px 41px 0 0;" @click="saveDraft" v-if="draftId == 0 && hideDraftMenu">存入草稿箱</Button>
            <Button type="error" style="float:right;margin: 14px 41px 0 0;" @click="updateDraft" v-else-if="draftId != 0 && hideDraftMenu">更新草稿</Button>
        </div>
        <div v-if="hideDraftMenu ==true && sessionDraftShow == 'false'">
            <div class="blogTitle">
                <input type="text" placeholder="在此输入博文的标题（最多25个字）" maxlength="50" v-model="blogTitle">
            </div>
            <div class="blogEditer">
                <el-upload
                    class="avatar-uploader"
                    action="/knbolg/article/saveArticleImg.do"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                </el-upload> 
                <quill-editor   
                    style="height:433px;"
                    v-model="content" 
                    ref="QuillEditor" 
                    :options="editorOption" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                </quill-editor>
            </div>
        </div>
        <div v-else-if="hideDraftMenu==false || sessionDraftShow == 'true'">
            <div class="draftTitle">
                <span>草稿箱</span>
            </div>
            <div class="draftList">
                 <div class="draft" v-for="item in draftList" :key="item.draftId">
                    <span class="draft-title">{{item.title}}</span>
                    <span class="draft-abstracts">{{item.abstracts}}</span>
                    <div class="draft-operator">
                        <span class="draft-editor" @click="editorDraft(item.draftId)">编辑草稿</span>
                        <span class="draft-delete" @click="showDeleteModal(item.draftId)">删除</span>
                    </div>
                 </div>
                <Page style="position: absolute;bottom: 0px;left: 290px;" v-if="draftList>4" :page-size="limit" :total="totalRecord" size="small" />
            </div>
        </div>
        
        <!-- 发布文章的modal -->
        <Modal
            title="发表博文"
            :mask-closable="false"
            :loading="loading"
            v-model="showPublishBlogModalStatus"
            @on-ok="publishBlog"
            class-name="vertical-center-modal">
                <div style="height:200px;">
                    <div style="height:40px;padding-top: 3px;">
                        <label style="font-size:14px;">博文类型：</label>
                        <Select v-model="blogType" style="width:200px">
                            <Option value="defaultBlogType">请选择博文类型</Option>
                            <Option value="ORIGINAL">原创</Option>
                            <Option value="TRANSSHIPMENT">转载</Option>
                        </Select>
                    </div>
                    <div style="height:40px;padding-top: 3px;margin-top: 6px;margin-bottom: 6px;">
                        <label style="font-size:14px;">博文分类：</label>
                        <Cascader :data="categoryData" class="casadeCategory" v-model="blogCategory" ></Cascader>
                    </div>
                    <div style="height:40px;padding-top: 3px;">
                        <label style="font-size:14px;">博文基因：</label>
                        <div class="addNewGene">
                            <Tag v-for="item in newGene" :key="item.geneName" :name="item.geneName" closable @on-close="handleClose2">{{item.geneName}}</Tag>
                            <Button icon="ios-add" type="dashed" size="small" @click="showAddGeneModal">添加标签</Button>
                            <Modal
                                v-model="addGeneModalStatus"
                                title="输入基因名"
                                width="300"
                                @on-ok="handleAdd">
                                <label>基因名：</label>
                                <Input v-model="geneName" size="small" placeholder="small size"  style="display: inline-block;width: 160px;"/>
                            </Modal>
                        </div>
                        
                        <Select v-model="oldGene" multiple style="width: 351px;margin-left: 70px;">
                            <Option v-for="item in cityList" :value="item.geneId" :disabled="countGeneNo" :key="item.geneId">{{ item.geneName }}</Option>
                        </Select>
                    </div>
                </div>
        </Modal>

        <!-- 删除草稿的modal -->
         <Modal v-model="showDeleteModalStatus" scrollable width="360" :mask-closable="false" :closable="false">
            <div style="text-align:center">
                <p style="font-size: 18px;color:#1a2a3a;">你确定要删除这篇草稿吗？</p>
            </div>
            <div slot="footer" style="padding:0">
                <Button type="default" size="large" @click="hideDeleteModal" style="margin-right: 49px;width:80px;">取消</Button>
                <Button type="error" size="large" @click="lastConfirmDelete" style="margin-right: 59px;width:80px;">确认</Button>
            </div>
         </Modal>
     


    </div>

</template> 
<script>
import MenuBar from "@/components/common/MenuBar.vue";
// import BlogCategory from "@/components/blog/BlogCategory.vue";
// import { quillEditor } from 'vue-quill-editor';

const clickoutside = {  // 自定义关闭指令
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {  // 判断节点是否包含你点击的节点
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};

// 工具栏配置
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
]


export default {
    name: "writeBlog",
 
    components: {
        MenuBar
    },
    directives: {clickoutside},
    data(){
        return {
            content:this.$store.state.editorArticle.content,  // 文章内容
            editorOption: {                
                modules: {
                    toolbar: {
                        container: toolbarOptions,  // 工具栏
                        handlers: {
                            'image': function (value) {
                                if (value) {
                                    // 调用el图片上传
                                    //   alert('自定义图片')
                                    document.querySelector('.avatar-uploader .el-upload').click()
                                } else {
                                    this.quill.format('image', false);
                                }
                            }
                        }
                    }
                }
            },
            editorType:'richText',  // 编辑器的类型，富文本或者MarkDown
            showOtherMenu:false,
            showPublishBlogModalStatus:false,
            blogType:'', // 博文类型
            cityList: [  // 已经创建的基因List，需要连接后台读取，以后需要改个名字叫 oldGeneList
                    {
                        geneId: 1,
                        geneName: 'New York'
                    },
                    {
                        geneId: 2,
                        geneName: 'London'
                    },
                    {
                        geneId: 3,
                        geneName: 'Sydney'
                    },
                    {
                        geneId: 4,
                        geneName: 'Ottawa'
                    },
                    {
                        geneId: 5,
                        geneName: 'Paris'
                    },
                    {
                        geneId: 6,
                        geneName: 'Canberra'
                    }
                ],
            oldGene: [],   // 旧创建的基因
            newGene:[],   // 新创建的基因
            blogTitle:this.$store.state.editorArticle.title, // 博客标题
            geneName:'', //添加基因名
            addGeneModalStatus :false,  // 显示添加新基因的模态框
            categoryData: [         // 博客分类的数据
                    // {
                    //     value: '',
                    //     label: '',
                    //     children: [],
                    // },
            ],
            blogCategory:[],  // 博文分类
            loading:true,
            draftId:0,  // 现在正在修改的草稿
            hideDraftMenu:true,
            page:1,
            limit:4,
            totalRecord:0,
            draftList:[],
            showDeleteModalStatus:false,
            deleteDraftId:0,
            sessionDraftShow:sessionStorage.getItem("draftShow")
        }
    },
    computed:{
        editorContent:function(){
            return this.$store.state.editorArticle.content;
        },
        editorTitle:function(){
            return this.$store.state.editorArticle.title;
        },
        countGeneNo:function(index){
            let length =  this.oldGene.length + this.newGene.length;
            if(length >= 4){
                return true;
            }
            return false;
        },
        resultGene:function(){
           let newGene = [].concat(this.newGene);
           for (let index = 0; index < this.oldGene.length; index++) {
               let obj = {
                   geneId:this.oldGene[index],
                   geneName:'',
               }
               newGene.push(obj);               
           }
           return newGene;
        },
        abstracts:function(){
            let abstractsData = this.content;
            var re1 = new RegExp("<.+?>","g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
            var msg = abstractsData.replace(re1,'');//执行替换成空字符
            return msg.length>30 ? msg.substring(0,30) : msg;
        }
    },
    watch: {
        editorContent:function(newValue,oldValue){
            this.content = this.editorContent;
        },
        editorTitle:function(){
            this.blogTitle = this.editorTitle;
        },
    },
    methods:{
        onEditorBlur(){//失去焦点事件
        },
        onEditorFocus(){//获得焦点事件
        },
        onEditorChange(){//内容改变事件
        },
        showOtherMenuFunc(){
            this.showOtherMenu = !this.showOtherMenu;
        },
        showPublishBlogModal(){
           this.showPublishBlogModalStatus = true;
        },
        publishBlog(){ //发布博文

            let _this = this;
            if (this.blogTitle == null || this.blogTitle == ''){
                this.$Message.error("标题不能为空");
                return;
            }
            if (this.content == null || this.content == '') {
                this.$Message.error("内容不能为空！");
                return;
            }
            if (this.blogType == null || this.blogType == '' || this.blogType == 'defaultBlogType') {
                this.$Message.error("博文类型不能为空！");
                return;
            }
            if (this.blogCategory.length == 0) {
                this.$Message.error("博文分类不能为空！");
                return;
            }
            console.log(this.resultGene);

            this.$axios({
                method: 'post',
                url: '/knbolg/article/insertArticle.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'articleId':_this.draftId,
                    'title':_this.blogTitle,
                    'content':_this.content,
                    'articleType':_this.blogType,
                    'firstCategory':{'categoryId':_this.blogCategory[_this.blogCategory.length-1]},
                    'genePool':_this.resultGene,
                    'abstracts':_this.abstracts
                }
            }).then( (response) => {
                setTimeout(() => {
                    this.showPublishBlogModalStatus = false;
                    _this.$Message.info('发布成功');
                }, 1000);
            })
            .catch(function (error) {
                this.$Message.info('发布失败，系统错误！');
            });

            
        },
        hideOtherMenu(e) {
            this.showOtherMenu = false;
        },
        showAddGeneModal(){
            let length =  this.oldGene.length + this.newGene.length;
            console.log("showAddGeneModal" + length);
            if(length >= 4){
                this.$Message.error('文章最多关联四个基因');
                return ;
            }     
            this.addGeneModalStatus = true;
        },
        handleAdd () {  // 添加基因
            let length =  this.oldGene.length + this.newGene.length;
            if(this.geneName == null || this.geneName == ''){
                this.$Message.error('基因名不能为空');
                return ;
            }else if(this.newGene.length >= 4){
                this.$Message.error('一篇文章最多关联四个基因');
                return ;
            }        
            var obj = {
                'geneId':"",
                'geneName':this.geneName
            }
            this.newGene.push(obj);        
        },
        handleClose2 (event, name) {    // 删除基因
            const index = this.newGene.indexOf(name);
            this.newGene.splice(index, 1);
        },
        goToBlogMain(){
            this.$router.push({ name: 'blogMain', params: { blogSort: 'tuijian' }});
        },
        handleAvatarSuccess(res, file) {
            console.log(res);
            // 获取富文本组件实例
            let quill = this.$refs.QuillEditor.quill
            // 如果上传成功
            if (res) {
                // 获取光标所在位置
                let length = quill.getSelection().index;
                // 插入图片，res为服务器返回的图片链接地址
                quill.insertEmbed(length, 'image', res.url)
                // 调整光标到最后
                quill.setSelection(length + 1)
            } else {
                // 提示信息，需引入Message
                Message.error('图片插入失败')
            }
        },
        goBloggerBlogList(){  // 点击用户名进入博客主的博客列表主页
            let _this = this;
            let store = this.$store;
            this.$axios({
                method: 'post',
                url: '/knbolg/article/findArticleByBloggerId.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'page':1,
                    'limit':7,
                    'userId':_this.$store.state.user.userId
                }
            }).then( (response) => {
                console.log(response.data);
                store.state.bloggerBlogList = response.data.pageParams.content;
                _this.$store.state.articleBlogger = response.data.blogger;
                store.commit("updatePageParam",{
                    page : response.data.pageParams.page,
                    limit : response.data.pageParams.limit,
                    totalPage : response.data.pageParams.totalPage,
                    totalRecord : response.data.pageParams.totalRecord,
                });
                store.commit("updateBloggerRelation",{
                    fansNo:response.data.fans,
                    attentionsNo:response.data.icons,
                    blogNo:response.data.blogNo,
                });
                store.commit("updateBloggerGenePool",response.data.genePool);
                _this.$router.push({ name: 'blogDetailPage', params: {userName: _this.$store.state.articleBlogger.userInformation.nickName
                ,articleId:'blogList'}});
                _this.$Message.info('获取列表成功');
            })
            .catch(function (error) {
                console.log(error);
                _this.$Message.info('获取列表失败');
            });
        },
        confirmUpdate(){
        
            let _this = this;
                if (this.blogTitle == null || this.blogTitle == ''){
                    this.$Message.error("标题不能为空");
                    return;
                }
                if (this.content == null || this.content == '') {
                    this.$Message.error("内容不能为空！");
                    return;
                }

                this.$axios({
                    method: 'post',
                    url: '/knbolg/article/updateArticle.do',
                    headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                    },
                    data:{
                        'title':_this.blogTitle,
                        'content':_this.content,
                        'articleId':_this.$store.state.editorArticle.articleId,
                    }
                }).then( (response) => {
                    this.$Message.success("成功");
                })
                .catch(function (error) {
                    this.$Message.info('更新失败，系统错误！');
                });
            
        },
        saveDraft(){
            let _this = this;
            if (this.blogTitle == null || this.blogTitle == ''){
                this.$Message.error("标题不能为空");
                return;
            }
            if (this.content == null || this.content == '') {
                this.$Message.error("内容不能为空！");
                return;
            }

            this.$axios({
                method: 'post',
                url: '/knbolg/draft/insertDraft.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'title':_this.blogTitle,
                    'content':_this.content,
                    'abstracts':_this.abstracts
                }
            }).then( (response) => {
                _this.draftId = response.data.draft.draftId;
                _this.$Message.success('保存草稿成功！');
            })
            .catch(function (error) {
                console.log(error)
                _this.$Message.info('发布失败，系统错误！');
            });
          
        },
        updateDraft(){
            let _this = this;
            if (this.blogTitle == null || this.blogTitle == ''){
                this.$Message.error("标题不能为空");
                return;
            }
            if (this.content == null || this.content == '') {
                this.$Message.error("内容不能为空！");
                return;
            }

            this.$axios({
                method: 'post',
                url: '/knbolg/draft/updateDraft.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                    'draftId':_this.draftId,
                    'title':_this.blogTitle,
                    'content':_this.content,
                    'abstracts':_this.abstracts
                }
            }).then( (response) => {
                _this.$Message.success('更新草稿成功！');
            })
            .catch(function (error) {
                console.log(error)
                _this.$Message.info('更新草稿失败，系统错误！');
            });
          
        },
        showDraft(){
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/draft/findDraftListByUserId.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:{
                   'page':_this.page,
                   'limit':_this.limit
                }
            }).then( (response) => {
                console.log(response.data);
                _this.draftList = response.data.pageParams.content;
                _this.totalRecord = response.data.pageParams.totalRecord;
                _this.$Message.success('查询成功');
                this.hideDraftMenu = false;
            })
            .catch(function (error) {
                console.log(error)
                _this.$Message.info('加载草稿箱失败，系统错误！');
            });
            
        },
        hideDraft(){
            this.$store.commit("updateEditorArticle",{
                title:'',
                content:'',
                articleId:''
             });
            sessionStorage.setItem("draftShow",false)
            this.draftId = 0;
            this.hideDraftMenu = true;
        },
        editorDraft(draftId){
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/draft/findDraftMessage.do',
                headers:{
                    "Content-Type":"application/json;charset=UTF-8"
                },
                data:draftId,
                
            }).then( (response) => {
                console.log(response.data);
                _this.$store.commit("updateEditorArticle",{
                    title:response.data.draft.title,
                    content:response.data.draft.content,
                    articleId:''
                });
                _this.draftId = response.data.draft.draftId;
                this.hideDraftMenu = true;
                _this.$router.push({ name: 'writeBlog', params: { userId:this.$store.state.user.userName}});
            })
            .catch(function (error) {
                console.log(error);
                _this.$Message.info('加载推荐失败');
            });
        },
        showDeleteModal(id){
            this.deleteDraftId = id;
            this.showDeleteModalStatus = true;
        },
        hideDeleteModal(){
            this.showDeleteModalStatus = false;
        },
        lastConfirmDelete(){
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/knbolg/draft/deleteDraft.do',
                headers:{
                        "Content-Type":"application/json;charset=UTF-8"
                },
                data:_this.deleteDraftId
            }).then( (response) => {
               _this.$Message.success('删除草稿成功');
               _this.showDeleteModalStatus = false;
                for (let index = 0; index < _this.draftList.length; index++) {
                   if(_this.deleteDraftId == _this.draftList[index].draftId){
                        _this.draftList.splice(index,1);
                        break;
                   }
               }
            })
            .catch(function (error) {
                _this.$Message.info('删除草稿失败！请重新尝试！');
            });
        }
            
    },
    mounted(){
        var _this = this;
        if(this.$store.state.categoryData == null || this.$store.state.categoryData == ''){
            this.$axios({
                method: 'post',
                url: '/knbolg/category/findAllCategory.do',
                }).then( (response) => {
                    let categoryList =  response.data.categoryList;
                    for (let index = 0; index < categoryList.length; index++) {
                        let obj = {
                            'value':categoryList[index].categoryId,
                            'label':categoryList[index].categoryName,
                            'children':[]
                        }
                        for(let j = 0;j < categoryList[index].children.length;j++){
                            let children = {
                                'value': categoryList[index].children[j].categoryId,
                                'label': categoryList[index].children[j].categoryName
                            }
                            obj.children[j] = children;
                        }
                        _this.categoryData.push(obj);
                    }
                    _this.$store.state.categoryData = _this.categoryData;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }else{
            _this.categoryData = _this.$store.state.categoryData;
        }

        if(this.sessionDraftShow == 'true'){
            this.showDraft();
        }
        
    },
    destroyed() {
         sessionStorage.setItem("draftShow",false)
    },
}
</script>   
<style scoped>

.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
}

 .vertical-center-modal .ivu-modal{
    top: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.menuImg {
    width: 45px;
    margin: 8px 8px 11px 41px;
    cursor: pointer;
}

.Header{
    width: 100%;
    height: 60px;
    background-color: #f6f6f6;
    margin-bottom: 15px;
    box-shadow: 0 1px 1px rgba(0,0,0,.08);
}

.blogTitle{
     width: 67%;
     height: 45px;
    margin: 0 auto;
    margin-bottom: 15px;
}

.draftTitle{
    width: 67%;
    height: 76px;
    margin: 0 auto;
    margin-bottom: 15px;
    padding-top: 11px;
    padding-left: 73px;
}

.draftTitle span{
    font-size: 17px;
    color: #808080;
}

.draftList{
    width: 57%;
    margin:0 auto;
    height: 459px;
    position: relative;
}

.draft{
    width: 100%;
    height: 79px;
    background-color: #fff;
    border-bottom: 1px solid rgb(133,133,133,0.3);
    padding-top: 7px;
    padding-left: 11px;
}

.draft-title{   
     display: block;
    font-size: 15px;
    color: #333;
}

.draft-abstracts{   
    display: block;
    margin: 5px 0 3px 0;
    color: #858585;
}

.draft-operator{
    text-align: right;
}

.draft-editor{
    color: #2d8cf0;
    margin-right: 36px;
    cursor: pointer;
}

.draft-delete{
    color: crimson;
    margin-right: 22px;
    cursor: pointer;
}

.blogTitle input{
    width: 100%;
    height: 45px;
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: rgba(0, 0, 0, 0);
    outline: none;
    font-size: 20px;
    padding-left: 7px;
    font-weight: bold;
    color: #1a2a3a;
}

.blogEditer{
    width: 67%;
    background-color: #f6f6f6;
    margin: 0 auto;
    height: 500px;
}

.otherMenu{
    background-color: #fff;
    height: 136px;
    width: 95px;
    -webkit-box-shadow: 0 1px 6px rgba(0,0,0,.2);
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    position: absolute;
    right: 21px;
    top: 67px;
}

.otherMenu ul{
    list-style: none;
}

.otherMenu li{
    height: 34px;
    text-align: center;
    padding-top: 8px;
    color: #1a2a3a;
    cursor: pointer;
}

.casadeCategory{
    width: 200px;
    display:inline-block;
}


.otherMenu li:hover{
   background-color: #f6f6f6;
}

.addNewGene{
    height: 50px;
    display: inline-block;
    width: 350px;
}

.avatar-uploader {
    display: none;
}

</style>
