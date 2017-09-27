/*
	gulpfile.js主配置文件，用于定义任务
	此处代码由Node执行

*/

"use strict";
//加载模块

var gulp=require("gulp");
var less=require("gulp-less");
var cssnano=require("gulp-cssnano");
var cssmin=require("gulp-cssmin")
var concat=require("gulp-concat")
var uglify=require("gulp-uglify");
var clean=require("gulp-clean")
var browserSync=require("browser-sync").create();
//定义一个简单的任务
gulp.task("hello",function(){
	console.log("hello World");
});

//html复制文件的任务
gulp.task("html",function(){
	gulp.src("src/**/*.html")//读取文件
	.pipe(gulp.dest("dist/"));//通过管道再次操作，写入到目标位置
});

//less编译和压缩到任务
gulp.task("less",function(){
	gulp.src("src/less/*.less")
	.pipe(less())//编译
	.pipe(cssnano())
	.pipe(gulp.dest("dist/css"));

});

gulp.task("min",function(){
	gulp.src("src/**/*.less")
	.pipe(less())//编译
	.pipe(cssmin())
	.pipe(gulp.dest("dist/css"));

});

gulp.task("concat",function(){
	gulp.src("src/**/*.html")
	.pipe(concat("all.html"))
	.pipe(uglify())
	.pipe(gulp.dest("dist/html"));

});

//js合并混淆到任务
gulp.task("js",function(){
	gulp.src("src/js/*.js")
	.pipe(concat("all.js"))//合并
	.pipe(uglify())//压缩混淆
	.pipe(gulp.dest("dist/js"));
});

//image压缩任务
// gulp.task("image",function(){
// 	gulp.src("src/images/*")
// 	.pipe(imagemin())
// 	.pipe(gulp.dest("dist/images"));//对jpg无效，对png有效
// });
//清空之前的内容
gulp.task("clean",function(){
	gulp.src("dist")
	.pipe(clean());
});

//合并任务
gulp.task("dist",["html","less","js"])

gulp.task("watch",function(){
	//监视src目录下所有的html文件，当发生变化时自动执行html任务
	gulp.watch("src/**/*.html",["html"]);
	gulp.watch("src/less/*.less",["less"]);
	gulp.watch("src/js/*.js",["js"]);
	gulp.watch("src/images/*",["image"]);


});

gulp.task("default",["html","js","less","watch"],function(){
	browserSync.init({
		server:{
			baseDir:"/dist"
		},
		port:2017
	});
});

