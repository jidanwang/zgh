        const track = document.getElementById('track');
        const dotsContainer = document.getElementById('dots');
        const totalSlides = track.children.length;
        let currentIndex = 0;
        let timer = null;

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        //切换函数
        function goToSlide(index) {
            // 处理边界（如果到了最后一张，点下一张回到第一张）
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            currentIndex = index;

            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        //自动播放
        function startAutoPlay() {
            clearInterval(timer);
            timer = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 4000); //4秒切换一次
        }

        document.getElementById('prev').addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            startAutoPlay(); //手动点完重置计时器
        });

        document.getElementById('next').addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            startAutoPlay();
        });
        //鼠标暂停
        const banner = document.getElementById('banner');
        banner.addEventListener('mouseenter', () => clearInterval(timer));
        banner.addEventListener('mouseleave', startAutoPlay);
        //启动自动播放
        startAutoPlay();
        //爱心墙
        const heartShape = [
            "00110001100",
            "01111011110",
            "11111111111",
            "11111111111",
            "11111111111",
            "01111111110",
            "00111111100",
            "00011111000",
            "00001110000",
            "00000100000"
        ];

        const wall = document.getElementById('heartWall');
        const playBtn = document.getElementById('playBtn');

        const myPhotos = [
          '1.1.jpeg','1.5.jpeg','1.2.jpeg','图片53.jpeg',
          '图片1.jpg','1.3.jpeg','图片2.png','1.4.jpeg','图片3.jpg',
          '1.6.jpeg','图片4.jpg','1.7.jpeg','图片5.jpg','1.8.jpeg',
          '图片6.jpg','1.9.jpeg','图片7.jpg','图片8.jpg','图片9.jpg',
          '图片10.jpg','图片11.png','图片12.jpg','图片13.jpeg',
          '图片14.jpeg','图片15.jpeg','图片16.jpeg','图片17.jpg','图片18.jpg','图片19.jpg',
          '图片20.jpg','图片21.jpg','图片22.jpg','图片23.jpg','图片24.jpg','图片25.jpg',
          '图片26.jpg','图片27.jpg','图片28.jpg','图片29.jpg','图片30.jpg','图片31.jpg',
          '图片38.jpg','图片33.jpg','图片39.jpg','图片35.jpg','图片36.jpg','图片37.jpg',
          '图片32.jpg','图片34.jpg','图片40.jpg','图片41.jpg','图片42.jpg','图片43.jpg',
          '图片44.jpg','图片45.jpg','图片46.jpg','图片47.jpg','图片48.png','图片49.jpg',
          '图片50.jpg','图片51.jpg','图片52.jpg','图片54.jpeg','图片55.jpeg',
        ];
        let photoIndex = 0;
        function renderHeart() {
            wall.innerHTML = ''; // 清空上一次的格子，方便重播
            photoIndex = 0;      // 照片索引归零

            // 遍历二维数组的行
            heartShape.forEach(rowString => {
                // 把 "0011" 这种字符串拆分成单个字符数组 ['0', '0', '1', '1']
                const cells = rowString.split('');

                // 遍历每一行里的列
                cells.forEach(cell => {
                    // 创建一个 div 格子
                    const div = document.createElement('div');
                    div.className = 'heart-photo';

                    if (cell === '1') {
                        //如果遇到 '1'，说明这里要放照片
                        //给格子加上 active 类，触发飞入动画
                        div.classList.add('active');

                        //生成随机的飞出位置和旋转角度
                        //Math.random() 生成 0~1 的小数，减 0.5 后变成 -0.5 到 0.5，乘 1500 就是屏幕四周的坐标范围
                        // const randomX = (Math.random() - 0.5) * 1500 + 'px';
                        // const randomY = (Math.random() - 0.5) * 1500 + 'px';
                        // const randomRotate = (Math.random() - 0.5) * 720 + 'deg';

                        if(cell==='1'){
                            div.classList.add('active');
                            const angle=Math.random()*Math.PI*2;
                            const radius=800;
                            const randomX=Math.cos(angle)*radius+'px';
                            const randomY=Math.sin(angle)*radius+'px';

                            const randomRotate=(Math.random()-0.5)*180+'deg';

                        

                        div.style.setProperty('--x', randomX);
                        div.style.setProperty('--y', randomY);
                        div.style.setProperty('--rot', randomRotate);

                        //让照片错落有致地飞入，随机延迟 0 到 0.4 秒
                        div.style.animationDelay = (Math.random() * 0.4) + 's';
                        const imgUrl = myPhotos[photoIndex % myPhotos.length];//取余数是为了让照片循环使用
                        div.style.backgroundImage = `url(${imgUrl})`;

                        photoIndex++; // 换下一张照片z
                        }
                    } else {
                        //如果遇到 '0'，说明这里是爱心边角的空白
                    }
                    wall.appendChild(div);
                });
            });
        }
        //按键重播
        playBtn.addEventListener('click', renderHeart);

        const familySection=document.getElementById('family');
        const observer=new IntersectionObserver((entries)=>{
            const entry=entries[0];
            if(entry.isIntersecting&&entry.intersectionRatio>=0.7){
                renderHeart();
                observer.unobserve(familySection);
            }
        },{
            threshold:0.7
        });
        observer.observe(familySection);
        const danmakuContainer=document.getElementById('danmakuContainer');
        const messageInput=document.getElementById('messageInput');
        const sendBtn=document.getElementById('sendBtn');

        function createDanmaku(text){
            const div=document.createElement('div');
            div.className='danmaku-item';
            div.innerText=text;

            div.style.top=Math.random()*80+'%';
            const duration=Math.random()*6+8;
            div.style.animationDuration=duration+'s';

            // if(!isNew){
            //     div.style.animationDelay=`-${Math.random()*duration}s`;
            // }

            danmakuContainer.appendChild(div);
            setTimeout(() => {
                div.remove();
            }, duration * 1000);

        }

        const app=cloudbase.init({env:"giant-gopher-d4g8ww0u7a84d50e2"});
        const db=app.database();
        // let lastMessageId=0;
        // async function fetchMessages() {
        //     try{
        //         const res=await db.from('message').select('*').order('id',{ascending:true});
        //         const messages=res.data;
        //         messages.forEach(msg=>{
        //             if(msg.id>lastMessageId){
        //                 createDanmaku(msg.content);
        //                 lastMessageId=msg.id;                    }
        //         });
        //     }catch(error){
        //         console.error("拉取留言失败了：",error);
        //     }
        // }

//         async function initDanmaku(){
//             try{
//                 const auth=app.auth({persistence:"local"});
//                 if(!auth.hasLoginState()){
//                     await auth.signInAnonymously();
//                 }
//             //     await fetchMessages();
//             //     setInterval(fetchMessages,3000);
//             // }catch(eroor){
//             //     console.error("云端连接失败了：",error);
//                 const messagesCollection=db.collection('messages');
        
//          messagesCollection.watch({
//             onChange: (snapshot) => {
//                 snapshot.docChanges.forEach((change) => {
//                     // 只要数据初始化或新增，就让弹幕飞出来
//                     if (change.dataType === 'init' || change.dataType === 'add') {
//                         createDanmaku(change.doc.content); 
//                     }
//                 });
//             },
//             onError: (err) => console.error("实时监听出错:", err)
//         });

//     } catch (error) {
//         console.error("云端连接失败:", error);
//     }
//         }
// //按钮
//         sendBtn.addEventListener('click', async () => {
//     const text = messageInput.value.trim();
//     if (!text) return; 

//     try {
//         // 文档型数据库用 add() 插入数据
//         await db.collection('messages').add({ content: text });
//         messageInput.value = ''; 
//         // 注意：这里不需要手动去拉取，上面的 watch() 会自动捕捉到并让弹幕飞出来！
//     } catch (error) {
//         console.error("发送失败:", error);
//         alert("发送失败，请检查权限设置！");
//     }
// });

//         initDanmaku();


let lastMessageId=null;
let messagesData=[];
let danmakuIndex=0;
async function fetchMessages(){
    try{
        const res =await db.collection('messages').orderBy('_id','asc').get();
        const messages=res.data;
        if (res.data.length > 0) {
    messagesData = res.data.map(msg => msg.content);
}
    }catch(error){
        console.error("从云端拉取留言失败了：",error);
    }
}
function startDanmakuEngine(){
    setInterval(()=>{
        if(messagesData.length===0)return;
        if(document.querySelectorAll('.danmaku-item').length>10)return;
        createDanmaku(messagesData[danmakuIndex]);
        danmakuIndex=(danmakuIndex +1)%messagesData.length;
    },2000)
}

async function initDanmaku() {
    try{
        const auth=app.auth({persistence:"local"});
        if(!auth.hasLoginState()){
            await auth.signInAnonymously();
        }
        console.log("匿名登录成功，开始拉取数据");
        await fetchMessages();
        startDanmakuEngine();

        setInterval(fetchMessages,3000);
    }catch(error){
        console.error("云端连接失败了：",error);
        
    }
    
}


sendBtn.addEventListener('click',async()=>{
    const text=messageInput.value.trim();
    if(!text)return;
    createDanmaku(text);
    messageInput.value='';
    try{
        await db.collection('messages').add({content:text});
        console.log("留言成功存入云端了");
        messagesData.push(text);
        
    }catch(error){
        console.error("存入云端失败了，请检查权限",error);
        
    }
});
messageInput.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'&&!e.isComposing){
        sendBtn.click();
    }
});
initDanmaku();