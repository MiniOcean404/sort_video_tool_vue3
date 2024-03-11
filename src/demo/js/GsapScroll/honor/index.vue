<template>
  <div class="honor">
    <!-- 头部 -->
    <div class="header-comp">
      <div class="header">
        <div class="header-v4">
          <div class="ho-middle-wrap">
            <div class="header-nav-v4 ho-middle-v4">
              <div class="logo-home">
                <img src="./images/honor-logo-black.svg" class="logo" alt="" />
              </div>
              <div class="pc-header">
                <div class="nav-lists">
                  <div class="nav-item">
                    <div class="nav-item-div">手机</div>
                  </div>
                  <div class="nav-item">
                    <div class="nav-item-div">笔记本</div>
                  </div>
                  <div class="nav-item">
                    <div class="nav-item-div">平板</div>
                  </div>
                  <div class="nav-item">
                    <div class="nav-item-div">穿戴</div>
                  </div>
                  <div class="nav-item">
                    <div class="nav-item-div">智慧屏</div>
                  </div>
                  <div class="nav-item">
                    <div class="nav-item-div">更多产品</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="content">
      <div class="main magic-os">
        <!-- 第一屏 -->
        <section class="section-hero section-dark section-row" id="section-hero">
          <div class="section-wrapper aspect-ratio">
            <div class="banner-img_box">
              <img src="./images/kv.png" class="banner-img" alt="" />
            </div>
            <div class="section-magic-os">
              <img src="./images/magic-os-light.svg" class="section-name" alt="" />
              <h2 class="section-slogan">越用越好用 越用越懂你</h2>
            </div>
          </div>
        </section>
        <!-- 第二屏 -->
        <section class="section-tvc">
          <div class="section-video-wrapper aspect-ratio">
            <div class="section-inline-video">
              <video autoplay loop muted playsinline webkit-playsinline>
                <source type="video/mp4" src="./images/tvc-glance.mp4" />
              </video>
            </div>
          </div>
        </section>
        <!-- 第三屏 -->
        <section class="section-magic">
          <div class="section-wrapper">
            <h2 class="section-headline fade-copy fade-trigger">4大技术加持 共筑新体验</h2>
            <div class="section-content section-row fade-copy fade-trigger">
              <div class="section-item">
                <img class="section-icon" src="./images/icon-magic-ring.svg" alt="" />
                <h3 class="section-headline-reduced">MagicRing 信任环</h3>
                <p class="section-intro">跨系统可信互联</p>
              </div>
              <div class="section-item">
                <img class="section-icon" src="./images/icon-magic-ring.svg" alt="" />
                <h3 class="section-headline-reduced">Magic Live 智慧引擎</h3>
                <p class="section-intro">平台级AI能力</p>
              </div>
              <div class="section-item">
                <img class="section-icon" src="./images/icon-magic-ring.svg" alt="" />
                <h3 class="section-headline-reduced">Turbo X 系统引擎</h3>
                <p class="section-intro">内核级底层性能增强</p>
              </div>
              <div class="section-item">
                <img class="section-icon" src="./images/icon-magic-ring.svg" alt="" />
                <h3 class="section-headline-reduced">MagicGuard 荣耀安全</h3>
                <p class="section-intro">三重安全防护体系</p>
              </div>
            </div>
          </div>
        </section>
        <!-- 第四屏 -->
        <section class="section-magic-ring section-start" ref="magicRing">
          <div class="sticky-wrapper">
            <div class="sticky-content section-row">
              <div class="section-wrapper" ref="magicRingWrap">
                <svg
                  class="magic-svg"
                  width="162px"
                  height="146px"
                  viewBox="0 0 162 146"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  ref="magicRingSvg"
                >
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-1536.000000, -479.000000)">
                      <g transform="translate(1542.400000, 483.800000)">
                        <ellipse
                          class="magic-path"
                          stroke="#000000"
                          stroke-width="8"
                          stroke-dasharray="0 220% 0"
                          transform="translate(74.844732, 68.400000) rotate(-240.000000) translate(-74.844732, -68.400000) "
                          cx="74.8447318"
                          cy="68.4"
                          rx="31.5406825"
                          ry="68.2132305"
                        ></ellipse>
                        <ellipse
                          class="magic-path"
                          stroke="#000000"
                          stroke-width="8"
                          stroke-dasharray="0 220% 0"
                          cx="74.8447318"
                          cy="68.4"
                          rx="31.4542843"
                          ry="68.4"
                        ></ellipse>
                        <ellipse
                          class="magic-path"
                          stroke="#000000"
                          stroke-width="8"
                          stroke-dasharray="0 220% 0"
                          transform="translate(74.844732, 68.400000) rotate(-300.000000) translate(-74.844732, -68.400000) "
                          cx="74.8447318"
                          cy="68.4"
                          rx="31.5406825"
                          ry="68.2132305"
                        ></ellipse>
                        <ellipse
                          ref="magicRingCircle"
                          class="magic-circle"
                          fill="#D7A85B"
                          cx="74.8447318"
                          cy="68.4"
                          rx="10.4847614"
                          ry="10.5230769"
                          opacity="0"
                        ></ellipse>
                      </g>
                    </g>
                  </g>
                </svg>

                <h2 class="section-headline will-show" ref="magicRingHeadline">MagicRing 信任环</h2>
                <p class="section-subhead will-show" ref="magicRingSub">智慧互联 再无界</p>
                <div class="section-link will-fadein" ref="magicRingLink">
                  <a class="section-intro" href="">查看智慧互联产品适配列表</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- 第五屏 -->
        <section class="section-connect-1 section-layout-connect">
          <div class="section-content-connect fade-copy fade-trigger">
            <h2 class="section-headline nowrap">
              三指上滑
              <br />
              万物互联
            </h2>
            <p class="section-intro">
              进入控制中心，三指上滑，拖动图标触碰周围的荣耀设备，一步开展多设备协同；
              <br />
              在App里，以上述相同操作，还可实现应用数据流转1。
            </p>
          </div>
          <div class="section-has-video fade-copy fade-trigger">
            <div class="section-video-wrapper aspect-ratio">
              <div class="section-inline-video section-rounded">
                <video
                  class="section-video-all section-rounded"
                  muted
                  playsinline
                  webkit-playsinline
                  x-webkit-airplay
                  x5-video-player-fullscreen
                  x5-video-player-type="h5"
                  src="./images/s1.mp4"
                ></video>
              </div>
            </div>
          </div>
        </section>
        <!-- 第六屏 -->
        <section class="section-connect-2 section-spacer section-layout-connect">
          <div class="section-content-connect fade-copy fade-trigger">
            <h2 class="section-headline nowrap">
              跨设备接续
              <br />
              思路畅通无阻
            </h2>
            <p class="section-intro">
              在一台荣耀设备上已经展开的工作，
              <br />
              能随着你切换到附近的荣耀设备上继续，
              <br />
              让工作衔接无缝，思路畅通无阻1。
            </p>
          </div>
          <div class="section-has-video fade-copy fade-trigger">
            <div class="section-video-wrapper aspect-ratio">
              <div class="section-inline-video section-rounded">
                <video
                  class="section-video-all section-rounded"
                  muted
                  playsinline
                  webkit-playsinline
                  x-webkit-airplay
                  x5-video-player-fullscreen
                  x5-video-player-type="h5"
                  src="./images/s2.mp4"
                ></video>
              </div>
            </div>
          </div>
        </section>
        <!-- 第七屏 -->
        <section class="section-connect-3 section-spacers section-layout-connect">
          <div class="section-wrapper">
            <div class="section-content-connect fade-copy fade-trigger">
              <h2 class="section-headline nowrap">
                一套键鼠
                <br />
                多设备自成一套
              </h2>
              <p class="section-intro">
                在荣耀电脑管家中，可以发现周围五台荣耀设备；
                <br />
                使用一套键鼠，同时控制其中任意三台，
                <br />
                多设备协同无间，多资源跨屏拖拽1。
              </p>
            </div>
            <div class="section-has-video fade-copy fade-trigger">
              <div class="section-video-wrapper aspect-ratio">
                <div class="section-inline-video section-rounded">
                  <video
                    class="section-video-all section-rounded"
                    muted
                    playsinline
                    webkit-playsinline
                    x-webkit-airplay
                    x5-video-player-fullscreen
                    x5-video-player-type="h5"
                    src="./images/s3.mp4"
                  ></video>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- 第八屏 -->
        <section class="section-connect-4 section-card-view section-grey section-spacer">
          <div class="sticky-wrapper">
            <div class="sticky-content">
              <div class="section-wrapper">
                <div class="section-card">
                  <div class="section-card-content section-rounded">
                    <div class="section-copy">
                      <div class="section-group">
                        <h3 class="section-headline">
                          重要不错过
                          <br />
                          重在不打扰
                        </h3>
                        <p class="section-intro">
                          直接在当前使用的荣耀设备上，
                          <br />
                          支持定制查看和回复所有手机通知消息。
                          <br />
                          重要信息不容错过，专注工作不被打扰1。
                        </p>
                      </div>
                    </div>
                    <div class="section-media">
                      <img src="./images/s4-01-poster.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <div class="section-card">
                  <div class="section-card-content section-rounded">
                    <div class="section-copy">
                      <div class="section-group">
                        <h3 class="section-headline">
                          来电不漏接
                          <br />
                          思考不中断
                        </h3>
                        <p class="section-intro">
                          在当前使用的荣耀设备上接打电话，
                          <br />
                          让重要来电不漏接，专注效率不中断1。
                        </p>
                      </div>
                    </div>
                    <div class="section-media">
                      <img src="./images/s4-02-poster.jpg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- 第九屏 -->
        <section class="section-connect-5 section-animate section-grey section-spacer">
          <div class="section-content fade-group">
            <div class="section-copy">
              <h2 class="section-headline fade-copy">
                多端同步
                <br />
                随处可见
              </h2>
              <p class="section-intro fade-copy fade-delay">
                首发电脑版荣耀笔记，帮你更高效的笔记整理，更快速的笔记编辑。在荣耀手机、平板、电脑设备上，随时随处查看修改笔记2。
              </p>
            </div>
            <div id="section-c5-p" class="section-picture aspect-ratio">
              <picture class="section-device-1 section-absolute will-show">
                <img src="./images/s5-01.png" alt="" />
              </picture>
              <picture class="section-device-2 section-absolute will-show">
                <img src="./images/s5-02.png" alt="" />
              </picture>
              <picture class="section-device-3 section-absolute will-show">
                <img src="./images/s5-03.png" alt="" />
              </picture>
            </div>
          </div>
        </section>
        <!-- 第十屏 -->
        <section class="section-connect-6 section-card-view section-grey section-spacers">
          <div class="sticky-wrapper">
            <div class="sticky-content">
              <div class="section-wrapper">
                <div class="section-card">
                  <div class="section-card-content section-rounded">
                    <div class="section-copy">
                      <div class="section-group">
                        <h3 class="section-headline">
                          精彩全收藏
                          <br />
                          兴趣永在线
                        </h3>
                        <p class="section-intro">
                          告诉你一个节省流量的妙招：
                          <br />
                          现在网页也能离线保存了。
                          <br />
                          把你的知识、视频永久收藏保存，
                          <br />
                          不论设备离线在线，
                          <br />
                          让你感兴趣的内容始终在线2。
                        </p>
                      </div>
                    </div>
                    <div class="section-media">
                      <img src="./images/s6-01-poster.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <div class="section-card">
                  <div class="section-card-content section-rounded">
                    <div class="section-copy">
                      <div class="section-group">
                        <h3 class="section-headline">
                          知音笔记
                          <br />
                          一触即达
                        </h3>
                        <p class="section-intro">
                          录音关联笔记，点击笔记，
                          <br />
                          自动跳转到相应的录音片段。
                          <br />
                          回顾会议、复习课程、随心批注更高效。
                        </p>
                      </div>
                    </div>
                    <div class="section-media">
                      <img src="./images/s6-01-poster.jpg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- 第十一屏 -->
        <section class="section-magic-live section-start">
          <div class="sticky-wrapper">
            <div class="sticky-content section-row">
              <div class="section-wrapper">
                <svg
                  class="magic-svg"
                  width="180px"
                  height="180px"
                  viewBox="0 0 180 180"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-1905.000000, -669.000000)">
                      <g transform="translate(1905.000000, 669.000000)">
                        <path
                          class="magic-path magic-path-gold"
                          d="M62.7625106,83 C94.5335445,83 94.1912184,83 134.118235,83 C145.540105,83 154.8,73.866141 154.8,62.5997328 C154.8,51.331863 145.540105,42.198004 134.118235,42.198004 C130.14992,42.198004 126.457224,43.3205522 123.308356,45.2309304 C123.115719,35.2420054 114.860499,27.2 104.687802,27.2 C96.595582,27.2 89.7288269,32.2938548 87.1519415,39.4004034 C84.5735742,32.2938548 77.7068191,27.2 69.6160805,27.2 C59.3218751,27.2 50.9762634,35.4305585 50.9762634,45.5861117 C50.9762634,46.2935509 51.0251635,46.9892969 51.1051818,47.6762731 C48.8720787,46.7437395 46.4181843,46.2277766 43.8398171,46.2277766 C33.5456117,46.2277766 25.2,54.4597967 25.2,64.6138883 C25.2,74.7679799 33.5456117,83 43.8398171,83 C48.2111282,83 52.1591186,83 55.7657777,83 L61.7290805,83 C69.7763602,75.4233981 73.8,66.4233981 73.8,56"
                          stroke="#D7A85B"
                          stroke-width="9"
                          stroke-dasharray="0 210% 0"
                        ></path>
                        <path
                          class="magic-path magic-path-black"
                          d="M134.118235,83 C145.540105,83 154.8,73.866141 154.8,62.5997328 C154.8,51.331863 145.540105,42.198004 134.118235,42.198004 C130.14992,42.198004 126.457224,43.3205522 123.308356,45.2309304 C123.115719,35.2420054 114.860499,27.2 104.687802,27.2 C96.595582,27.2 89.7288269,32.2938548 87.1519415,39.4004034 C84.5735742,32.2938548 77.7068191,27.2 69.6160805,27.2 C59.3218751,27.2 50.9762634,35.4305585 50.9762634,45.5861117 C50.9762634,46.2935509 51.0251635,46.9892969 51.1051818,47.6762731 C48.8720787,46.7437395 46.4181843,46.2277766 43.8398171,46.2277766 C33.5456117,46.2277766 25.2,54.4597967 25.2,64.6138883 C25.2,74.7679799 33.5456117,83 43.8398171,83 C88.9790258,83 88.9790258,83 134.118235,83 Z"
                          stroke="#000000"
                          stroke-width="8.8"
                          opacity="0"
                        ></path>
                        <path
                          class="magic-path magic-path-gold"
                          d="M62.5625106,152.8 C94.3335445,152.8 93.9912184,152.8 133.918235,152.8 C145.340105,152.8 154.6,143.666141 154.6,132.399733 C154.6,121.131863 145.340105,111.998004 133.918235,111.998004 C129.94992,111.998004 126.257224,113.120552 123.108356,115.03093 C122.915719,105.042005 114.660499,97 104.487802,97 C96.395582,97 89.5288269,102.093855 86.9519415,109.200403 C84.3735742,102.093855 77.5068191,97 69.4160805,97 C59.1218751,97 50.7762634,105.230558 50.7762634,115.386112 C50.7762634,116.093551 50.8251635,116.789297 50.9051818,117.476273 C48.6720787,116.54374 46.2181843,116.027777 43.6398171,116.027777 C33.3456117,116.027777 25,124.259797 25,134.413888 C25,144.56798 33.3456117,152.8 43.6398171,152.8 C48.0111282,152.8 51.9591186,152.8 55.5657777,152.8 L61.5290805,152.8 C69.5763602,145.223398 73.6,136.223398 73.6,125.8"
                          stroke="#D7A85B"
                          stroke-width="9"
                          stroke-dasharray="0 210% 0"
                          transform="translate(89.800000, 124.900000) scale(1, -1) translate(-89.800000, -124.900000) "
                        ></path>
                        <path
                          class="magic-path magic-path-black"
                          d="M133.918235,152.8 C145.340105,152.8 154.6,143.666141 154.6,132.399733 C154.6,121.131863 145.340105,111.998004 133.918235,111.998004 C129.94992,111.998004 126.257224,113.120552 123.108356,115.03093 C122.915719,105.042005 114.660499,97 104.487802,97 C96.395582,97 89.5288269,102.093855 86.9519415,109.200403 C84.3735742,102.093855 77.5068191,97 69.4160805,97 C59.1218751,97 50.7762634,105.230558 50.7762634,115.386112 C50.7762634,116.093551 50.8251635,116.789297 50.9051818,117.476273 C48.6720787,116.54374 46.2181843,116.027777 43.6398171,116.027777 C33.3456117,116.027777 25,124.259797 25,134.413888 C25,144.56798 33.3456117,152.8 43.6398171,152.8 C88.7790258,152.8 88.7790258,152.8 133.918235,152.8 Z"
                          stroke="#000000"
                          stroke-width="8.8"
                          opacity="0"
                          transform="translate(89.800000, 124.900000) scale(1, -1) translate(-89.800000, -124.900000) "
                        ></path>
                        <rect x="0" y="0" width="180" height="180"></rect>
                      </g>
                    </g>
                  </g>
                </svg>
                <h2 class="section-headline will-show">Magic Live 智慧引擎</h2>
                <p class="section-subhead will-show">越用越好用</p>
              </div>
            </div>
          </div>
        </section>
        <!-- 第十二屏 -->
        <section class="section-service-1">
          <div class="section-copy">
            <h2 class="section-headline">
              YOYO建议
              <br />
              多服务组合推荐 更懂你
            </h2>
            <p class="section-intro">
              YOYO 个人化服务场景更丰富，同时提供多场景下多个并行服务的组合推荐；
              <br />
              你需要的精准服务，一键直达，无需在APP内频繁操作。
            </p>
          </div>
          <div id="section-service-1" class="sticky-wrapper">
            <div class="sticky-content">
              <div class="section-content">
                <div id="section-s1-c1" class="section-subcopy section-copy-1 will-show">
                  <h2 class="section-headline-reduced">人因优化 顺畅出行</h2>
                  <p class="section-intro">
                    YOYO
                    建议综合考虑你的当前位置、出发地天气、实时路况以及个人航旅习惯等多个因素，为你提供最适合的航旅出行建议，让航班出票、出发提醒、值机、登机等信息适时呈现。
                  </p>
                </div>
                <div id="section-s1-c2" class="section-subcopy section-copy-2 will-show">
                  <h2 class="section-headline-reduced">安排不错 出行不错过</h2>
                  <p class="section-intro">
                    YOYO 在你出行前提示重要日程，
                    <br />
                    为你做好行程规划。
                  </p>
                </div>
                <div id="section-s1-p" class="section-picture">
                  <div class="section-picture-1 aspect-ratio">
                    <picture>
                      <img src="./images/s1-01.png" alt="" />
                    </picture>
                  </div>
                  <div id="section-service-card" class="section-service-card">
                    <div id="section-s1-p2" class="section-card section-picture-2 will-zoomin">
                      <picture>
                        <img src="./images/s1-02.png" alt="" />
                      </picture>
                    </div>
                    <div id="section-s1-p3" class="section-card section-picture-3 will-zoomin">
                      <picture>
                        <img src="./images/s1-03.png" alt="" />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- 第十三屏 -->
        <section class="section-service-2 section-spacers">
          <div class="section-copy">
            <h2 class="section-headline">YOYO建议 场景倍增</h2>
            <p class="section-intro">
              YOYO建议的服务场景更多，成为您出行、工作生活、娱乐等多个场景的贴心助理：
              <br />
              替您管理 地铁通勤、无忧打卡、健康码、付款码、惬意观影、快递提醒、充电提醒等多个场景。
            </p>
          </div>
          <div class="section-card">
            <picture>
              <img src="./images/s2-card.png" alt="" />
            </picture>
          </div>
        </section>

        <!-- 第十四屏 -->
        <section class="section-service-3 section-card-view section-grey section-spacers">
          <div class="sticky-wrapper section-3cards">
            <div class="sticky-content">
              <h2 class="section-headline section-main-headline">Magic 文本</h2>
              <div class="section-wrapper">
                <div class="section-card">
                  <div class="section-card-content section-rounded">
                    <div class="section-copy">
                      <div class="section-group">
                        <h3 class="section-headline-reduced">提取快 识别准</h3>
                        <p class="section-intro">
                          手机上任意界面的文字，用指关节圈选，
                          <br />
                          即可一步实现全局高精准提取。
                        </p>
                      </div>
                    </div>
                    <div class="section-media">
                      <img src="./images/s3-01.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <div class="section-card">
                  <div class="section-card-content section-rounded">
                    <div class="section-copy">
                      <div class="section-group">
                        <h3 class="section-headline-reduced">生活服务 一点即达</h3>
                        <p class="section-intro">
                          智慧分析图片中的文本语义：电话座机、地址、快
                          <br />
                          递号、航班班次、身份证、邮箱、网址等信息，后
                          <br />
                          续操作一点即达。
                        </p>
                      </div>
                    </div>
                    <div class="section-media">
                      <img src="./images/s3-02.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <div class="section-card">
                  <div class="section-card-content section-rounded">
                    <div class="section-copy">
                      <div class="section-group">
                        <h3 class="section-headline-reduced">翻页扫描</h3>
                        <p class="section-intro">
                          文档自动连拍扫描，超强去阴影，智能防止重复。
                          <br />
                          扫描导出的格式更丰富，支持图片、TXT、PDF。
                        </p>
                      </div>
                    </div>
                    <div class="section-media">
                      <img src="./images/s3-02.jpg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 第十五屏 -->
        <section class="section-turbo-x section-start section-dark">
          <div class="sticky-wrapper">
            <div class="sticky-content section-row">
              <div class="section-wrapper">
                <svg
                  class="magic-svg"
                  width="180px"
                  height="180px"
                  viewBox="0 0 180 180"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-2535.000000, -669.000000)">
                      <g transform="translate(2535.000000, 669.000000)">
                        <rect x="0" y="0" width="180" height="180"></rect>
                        <path
                          class="magic-path magic-path-circle"
                          d="M142.915808,147.793341 C156.914565,134.072229 165.6,114.95041 165.6,93.8 C165.6,52.0472729 131.752727,18.2 90,18.2 C48.2472729,18.2 14.4,52.0472729 14.4,93.8 C14.4,114.901577 23.0453746,133.983919 36.9873129,147.698214"
                          stroke="#d7a85b"
                          stroke-width="9"
                          stroke-linecap="round"
                          stroke-dasharray="0 200% 0"
                          stroke-dashoffset="2"
                        ></path>
                        <g
                          class="magic-path magic-path-line magic-path-gold"
                          transform="translate(27.000000, 34.400000)"
                          stroke="#DFB97C"
                          stroke-width="5.4"
                        >
                          <line
                            class="l1"
                            x1="-2.94900823e-12"
                            y1="62.1"
                            x2="19.40625"
                            y2="62.1"
                          ></line>
                          <line class="l2" x1="104.79375" y1="62.1" x2="124.2" y2="62.1"></line>
                          <line
                            class="l1"
                            x1="3.2651028"
                            y1="77.3377451"
                            x2="21.9322582"
                            y2="72.3358959"
                          ></line>
                          <line
                            class="l2"
                            x1="104.067742"
                            y1="50.3277594"
                            x2="122.734897"
                            y2="45.3259102"
                          ></line>
                          <line
                            class="l1"
                            x1="8.1485825"
                            y1="87.4214704"
                            x2="27.4742438"
                            y2="87.4214704"
                            transform="translate(17.811413, 87.421470) rotate(-30.000000) translate(-17.811413, -87.421470) "
                          ></line>
                          <line
                            class="l2"
                            x1="98.5257562"
                            y1="35.2421849"
                            x2="117.851417"
                            y2="35.2421849"
                            transform="translate(108.188587, 35.242185) rotate(-30.000000) translate(-108.188587, -35.242185) "
                          ></line>
                          <line
                            class="l2"
                            x1="90.233496"
                            y1="24.435501"
                            x2="109.559157"
                            y2="24.435501"
                            transform="translate(99.896327, 24.435501) rotate(-45.000000) translate(-99.896327, -24.435501) "
                          ></line>
                          <line
                            class="l2"
                            x1="79.4268121"
                            y1="16.1432408"
                            x2="98.7524734"
                            y2="16.1432408"
                            transform="translate(89.089643, 16.143241) rotate(-60.000000) translate(-89.089643, -16.143241) "
                          ></line>
                          <line
                            class="l2"
                            x1="66.8421622"
                            y1="10.9305081"
                            x2="86.1678235"
                            y2="10.9305081"
                            transform="translate(76.504993, 10.930508) rotate(-75.000000) translate(-76.504993, -10.930508) "
                          ></line>
                          <line
                            class="l2"
                            x1="54"
                            y1="9.9"
                            x2="73.8"
                            y2="9.9"
                            transform="translate(63.900000, 9.900000) rotate(-90.000000) translate(-63.900000, -9.900000) "
                          ></line>
                          <line
                            class="l2"
                            x1="39.8321765"
                            y1="10.9305081"
                            x2="59.1578378"
                            y2="10.9305081"
                            transform="translate(49.495007, 10.930508) rotate(-105.000000) translate(-49.495007, -10.930508) "
                          ></line>
                          <line
                            class="l2"
                            x1="27.2475266"
                            y1="16.1432408"
                            x2="46.5731879"
                            y2="16.1432408"
                            transform="translate(36.910357, 16.143241) rotate(-120.000000) translate(-36.910357, -16.143241) "
                          ></line>
                          <line
                            class="l2"
                            x1="16.4408427"
                            y1="24.435501"
                            x2="35.766504"
                            y2="24.435501"
                            transform="translate(26.103673, 24.435501) rotate(-135.000000) translate(-26.103673, -24.435501) "
                          ></line>
                          <line
                            class="l1"
                            x1="116.556844"
                            y1="92.2528857"
                            x2="99.82033"
                            y2="82.5900551"
                          ></line>
                          <line
                            class="l2"
                            x1="26.17967"
                            y1="40.0736002"
                            x2="9.44315634"
                            y2="30.4107695"
                          ></line>
                          <line
                            class="l1"
                            x1="122.734897"
                            y1="77.3377451"
                            x2="104.067742"
                            y2="72.3358959"
                          ></line>
                          <line
                            class="l2"
                            x1="21.9322582"
                            y1="50.3277594"
                            x2="3.2651028"
                            y2="45.3259102"
                          ></line>
                        </g>
                        <g
                          class="magic-path magic-path-line magic-path-white"
                          transform="translate(27.000000, 34.400000)"
                          stroke="#FFFFFF"
                          stroke-width="5.4"
                        >
                          <line
                            class="l1"
                            x1="-2.94900823e-12"
                            y1="62.1"
                            x2="19.40625"
                            y2="62.1"
                          ></line>
                          <line class="l2" x1="104.79375" y1="62.1" x2="124.2" y2="62.1"></line>
                          <line
                            class="l1"
                            x1="3.2651028"
                            y1="77.3377451"
                            x2="21.9322582"
                            y2="72.3358959"
                          ></line>
                          <line
                            class="l2"
                            x1="104.067742"
                            y1="50.3277594"
                            x2="122.734897"
                            y2="45.3259102"
                          ></line>
                          <line
                            class="l1"
                            x1="8.1485825"
                            y1="87.4214704"
                            x2="27.4742438"
                            y2="87.4214704"
                            transform="translate(17.811413, 87.421470) rotate(-30.000000) translate(-17.811413, -87.421470) "
                          ></line>
                          <line
                            class="l2"
                            x1="98.5257562"
                            y1="35.2421849"
                            x2="117.851417"
                            y2="35.2421849"
                            transform="translate(108.188587, 35.242185) rotate(-30.000000) translate(-108.188587, -35.242185) "
                          ></line>
                          <line
                            class="l2"
                            x1="90.233496"
                            y1="24.435501"
                            x2="109.559157"
                            y2="24.435501"
                            transform="translate(99.896327, 24.435501) rotate(-45.000000) translate(-99.896327, -24.435501) "
                          ></line>
                          <line
                            class="l2"
                            x1="79.4268121"
                            y1="16.1432408"
                            x2="98.7524734"
                            y2="16.1432408"
                            transform="translate(89.089643, 16.143241) rotate(-60.000000) translate(-89.089643, -16.143241) "
                          ></line>
                          <line
                            class="l2"
                            x1="66.8421622"
                            y1="10.9305081"
                            x2="86.1678235"
                            y2="10.9305081"
                            transform="translate(76.504993, 10.930508) rotate(-75.000000) translate(-76.504993, -10.930508) "
                          ></line>
                          <line
                            class="l2"
                            x1="54"
                            y1="9.9"
                            x2="73.8"
                            y2="9.9"
                            transform="translate(63.900000, 9.900000) rotate(-90.000000) translate(-63.900000, -9.900000) "
                          ></line>
                          <line
                            class="l2"
                            x1="39.8321765"
                            y1="10.9305081"
                            x2="59.1578378"
                            y2="10.9305081"
                            transform="translate(49.495007, 10.930508) rotate(-105.000000) translate(-49.495007, -10.930508) "
                          ></line>
                          <line
                            class="l2"
                            x1="27.2475266"
                            y1="16.1432408"
                            x2="46.5731879"
                            y2="16.1432408"
                            transform="translate(36.910357, 16.143241) rotate(-120.000000) translate(-36.910357, -16.143241) "
                          ></line>
                          <line
                            class="l2"
                            x1="16.4408427"
                            y1="24.435501"
                            x2="35.766504"
                            y2="24.435501"
                            transform="translate(26.103673, 24.435501) rotate(-135.000000) translate(-26.103673, -24.435501) "
                          ></line>
                          <line
                            class="l1"
                            x1="116.556844"
                            y1="92.2528857"
                            x2="99.82033"
                            y2="82.5900551"
                          ></line>
                          <line
                            class="l2"
                            x1="26.17967"
                            y1="40.0736002"
                            x2="9.44315634"
                            y2="30.4107695"
                          ></line>
                          <line
                            class="l1"
                            x1="122.734897"
                            y1="77.3377451"
                            x2="104.067742"
                            y2="72.3358959"
                          ></line>
                          <line
                            class="l2"
                            x1="21.9322582"
                            y1="50.3277594"
                            x2="3.2651028"
                            y2="45.3259102"
                          ></line>
                        </g>
                        <path
                          class="magic-path magic-path-icon"
                          d="M71.8651016,92.1469625 L83.025657,103.19356 C83.7122311,103.873124 84.8128123,103.889561 85.5193748,103.230805 L111.591534,78.9226898 L111.591534,78.9226898"
                          stroke="#DFB97C"
                          stroke-width="9"
                          stroke-linecap="round"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <h2 class="section-headline will-show">Turbo X 系统引擎</h2>
                <p class="section-subhead will-show">流畅性能 久用如新</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 第十六屏 -->
        <section class="section-performance-1 section-start-2 section-dark">
          <div class="sticky-wrapper">
            <div class="sticky-content">
              <div class="section-headline-wrapper">
                <div class="section-item section-fill-item">
                  <div class="section-line-wrapper section-line-1">
                    <div class="section-line"></div>
                  </div>
                  <div class="section-line-wrapper section-line-2">
                    <div class="section-line"></div>
                  </div>
                  <div class="section-fill-wrapper os-turbo-x">
                    <div class="section-fill-content">
                      <div class="section-fill section-fill-1"></div>
                      <div class="section-fill section-fill-2"></div>
                      <img class="section-headline-picture" src="./images/os-turbo-x.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div class="section-item section-mask-item">
                  <h2 class="section-headline">流畅升级 功耗更优</h2>
                  <div class="section-headline-mask"></div>
                </div>
              </div>
              <div class="section-content section-row">
                <div class="section-col">
                  <h3 class="section-headline-reduced">系统更流畅</h3>
                  <div class="section-improved">
                    <div class="section-improved-item">
                      <p class="section-intro">应用滑动卡顿率</p>
                      <div class="section-ratio">
                        <img src="./images/icon-arrow-down-blue.svg" alt="" class="section-icon" />
                        <p class="section-number">43%</p>
                      </div>
                    </div>
                    <div class="section-improved-item">
                      <p class="section-intro">应用启动响应时延</p>
                      <div class="section-ratio">
                        <img src="./images/icon-arrow-down-blue.svg" alt="" class="section-icon" />
                        <p class="section-number">29%</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="section-line-space"></div>
                <div class="section-col">
                  <h3 class="section-headline-reduced">续航更持久</h3>
                  <div class="section-improved">
                    <div class="section-improved-item">
                      <p class="section-intro">视频聊天</p>
                      <div class="section-ratio">
                        <img src="./images/icon-arrow-up-blue.svg" alt="" class="section-icon" />
                        <p class="section-number">
                          20
                          <span>分钟</span>
                        </p>
                      </div>
                    </div>
                    <div class="section-improved-item">
                      <p class="section-intro">刷短视频</p>
                      <div class="section-ratio">
                        <img src="./images/icon-arrow-up-blue.svg" alt="" class="section-icon" />
                        <p class="section-number">
                          30
                          <span>分钟</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 第十七屏 -->
        <section class="section-performance-2 section-start-2 section-dark">
          <div class="sticky-wrapper">
            <div class="sticky-content">
              <div class="section-headline-wrapper">
                <div class="section-item section-fill-item">
                  <div class="section-line-wrapper section-line-1">
                    <div class="section-line"></div>
                  </div>
                  <div class="section-line-wrapper section-line-2">
                    <div class="section-line"></div>
                  </div>
                  <div class="section-fill-wrapper gpu-turbo-x">
                    <div class="section-fill-content">
                      <div class="section-fill section-fill-1"></div>
                      <div class="section-fill section-fill-2"></div>
                      <img class="section-headline-picture" src="./images/gpu-turbo-x.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div class="section-item section-mask-item">
                  <h2 class="section-headline">帧率更高更稳定</h2>
                  <div class="section-headline-mask"></div>
                </div>
              </div>
              <div class="section-content">
                <div class="section-picture aspect-ratio">
                  <picture>
                    <img class="blur-up lazyload" src="./images/gpu-turbo-x-01.png" alt="" />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 第十八屏 -->
        <section class="section-performance-3 section-start-2 section-dark">
          <div class="sticky-wrapper">
            <div class="sticky-content section-row">
              <div class="section-headline-wrapper">
                <div class="section-item section-fill-item">
                  <div class="section-line-wrapper section-line-1">
                    <div class="section-line"></div>
                  </div>
                  <div class="section-line-wrapper section-line-2">
                    <div class="section-line"></div>
                  </div>
                  <div class="section-fill-wrapper gpu-turbo-x">
                    <div class="section-fill-content">
                      <div class="section-fill section-fill-1"></div>
                      <div class="section-fill section-fill-2"></div>
                      <img
                        class="section-headline-picture"
                        src="./images/link-turbo-x.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="section-item section-mask-item">
                  <h2 class="section-headline">网络自主优选 通信稳定流畅</h2>
                  <div class="section-headline-mask"></div>
                </div>
              </div>
              <div class="section-content section-row">
                <img
                  class="section-icon-tower section-icon-1"
                  src="./images/icon-signal-tower-white.svg"
                  alt=""
                />
                <div class="section-col">
                  <div class="section-headline-reduced">
                    蜂窝网络数据卡顿率
                    <sup>5</sup>
                  </div>
                  <div class="section-ratio">
                    <img src="./images/icon-arrow-down-blue.svg" alt="" class="section-icon" />
                    <p class="section-col-intro section-intro-2">83%</p>
                  </div>
                </div>
                <img
                  class="section-icon-tower section-icon-2"
                  src="./images/icon-signal-tower-blue.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <!-- 第十九屏 -->
        <section class="section-magic-guard section-start section-dark">
          <div class="sticky-wrapper">
            <div class="sticky-content section-row">
              <div class="section-wrapper">
                <svg
                  class="magic-svg"
                  width="180px"
                  height="180px"
                  viewBox="0 0 180 180"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-2263.000000, -669.000000)">
                      <g transform="translate(2263.000000, 669.000000)">
                        <rect x="0" y="0" width="180" height="180"></rect>
                        <path
                          class="magic-path magic-path-line"
                          d="M151.182961,101.417221 C151.182961,75.6528841 151.182961,51.5672821 151.182961,29.1604146 L89.9829612,18.0391451 L28.7829612,29.1604146 C28.7829612,51.5672821 28.7829612,75.6528841 28.7829612,101.417221 C28.7829612,127.181557 49.1829612,147.388865 89.9829612,162.039145 C130.782961,147.388865 151.182961,127.181557 151.182961,101.417221 Z"
                          stroke="#d7a85b"
                          stroke-width="9"
                          stroke-dasharray="0 260% 0"
                        ></path>
                        <path
                          class="magic-path magic-path-icon"
                          d="M68.4,85.1430969 L81.0472115,97.6305357 C81.8225916,98.3961204 83.0635635,98.4146531 83.8614592,97.6725636 L113.4,70.2 L113.4,70.2"
                          stroke="#DFB97C"
                          stroke-width="9"
                          stroke-linecap="round"
                          opacity="0"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <h2 class="section-headline will-show">MagicGuard 荣耀安全</h2>
                <p class="section-subhead will-show">科技有道 隐私至上</p>
                <div class="section-link will-fadein">
                  <a
                    class="section-intro ga-screen-click"
                    href="https://www.hihonor.com/cn/privacy/"
                    target="_blank"
                  >
                    了解更多
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 第二十屏 -->
        <section class="section-start section-start-3">
          <div class="sticky-wrapper">
            <div class="sticky-content section-row">
              <div class="section-wrapper">
                <h2 class="section-headline will-show">Flow Design</h2>
                <p class="section-subhead will-show">自然交互 随心体验</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 第二十一屏 -->
        <section class="section-design-3 will-change">
          <div id="section-design-3" class="sticky-wrapper">
            <div class="sticky-content">
              <div class="section-honor-sans">
                <h2 class="section-headline-reduced will-show">HONOR Sans</h2>
                <div class="section-breath-font section-row">
                  <div class="section-text-wrapper">
                    <div class="section-spilt section-spilt-1">
                      <img class="section-s1" src="./images/text/1.svg" />
                      <img class="section-s2" src="./images/text/2.svg" />
                      <img class="section-s3" src="./images/text/3.svg" />
                      <img class="section-s4" src="./images/text/4.svg" />
                      <img class="section-s5" src="./images/text/5.svg" />
                    </div>
                    <div class="section-spilt section-spilt-2">
                      <img class="section-s6" src="./images/text/6.svg" />
                      <img class="section-s7" src="./images/text/7.svg" />
                      <img class="section-s8" src="./images/text/8.svg" />
                      <img class="section-s9" src="./images/text/9.svg" />
                      <img class="section-s10" src="./images/text/10.svg" />
                      <img class="section-s11" src="./images/text/11.svg" />
                      <img class="section-s19" src="./images/text/19.svg" />
                      <img class="section-s12" src="./images/text/12.svg" />
                    </div>
                    <div class="section-spilt section-spilt-3">
                      <img class="section-s13" src="./images/text/13.svg" />
                      <img class="section-s14" src="./images/text/14.svg" />
                      <img class="section-s15" src="./images/text/15.svg" />
                    </div>
                    <div class="section-spilt section-spilt-4">
                      <img class="section-s16" src="./images/text/16.svg" />
                      <img class="section-s17" src="./images/text/17.svg" />
                      <img class="section-s18" src="./images/text/18.svg" />
                    </div>
                  </div>
                  <h2 class="section-headline">让阅读如呼吸般自然</h2>
                </div>
                <p class="section-intro will-show">自然呼吸感，当然更养眼。</p>
              </div>
              <div class="section-has-video">
                <div class="section-video-wrapper aspect-ratio">
                  <video
                    class="section-video-all section-rounded ended played"
                    muted
                    playsinline
                    webkit-playsinline
                    x-webkit-airplay
                    x5-video-player-fullscreen
                    x5-video-player-type="h5"
                    src="./images/design/s3.mp4"
                  ></video>
                </div>
                <div class="section-button-wrapper align-button"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- 第二十二屏 -->
        <!-- <section class="section-design-4 section-spacers will-change is-visible">
          <h2 class="section-headline">
            人因动效
            <br />
            源自真实 感受真实
          </h2>
          <div id="section-d4-wrapper" class="sticky-wrapper">
            <div class="sticky-content">
              <div class="section-content section-row">
                <div id="section-d4-c1" class="section-copy section-copy-1">
                  <h3 id="section-d4-h2" class="section-headline-reduced">解锁<br />进入桌面</h3>
                </div>
                <div id="section-d4-c2" class="section-copy section-copy-2">
                  <h3 id="section-d4-h2" class="section-headline-reduced">桌面元素<br />放置</h3>
                </div>
                <div id="section-d4-c3" class="section-copy section-copy-3">
                  <h3 id="section-d4-h3" class="section-headline-reduced">图片<br />打开效果</h3>
                </div>
                <div id="section-d4-video" class="section-media-wrapper">
                  <div class="section-design-videos">
                    <div id="section-d4-v1" class="section-design-video">
                      <div class="section-video-wrapper section-video-wrapper-1 aspect-ratio">
                        <div class="section-inline-video">
                          <video
                            muted
                            playsinline
                            webkit-playsinline
                            x-webkit-airplay
                            x5-video-player-fullscreen
                            x5-video-player-type="h5"
                            src="./images/design/s4-01.mp4"
                          ></video>
                          <img class="section-static-frame" src="./images/design/s4-01.jpg" alt="" />
                        </div>
                      </div>
                      <div class="section-button-wrapper align-button">
                        <div class="section-video-button section-replay-all will-fadein">
                          <span
                            class="section-video-copy ga-screen-click"
                            data-title-name="MagicOS"
                            data-button-name="再次播放"
                            >再次播放</span
                          >
                        </div>
                      </div>
                    </div>
                    <div id="section-d4-v2" class="section-design-video">
                      <div class="section-video-wrapper">
                        <div class="section-inline-video">
                          <video
                            muted
                            playsinline
                            webkit-playsinline
                            x-webkit-airplay
                            x5-video-player-fullscreen
                            x5-video-player-type="h5"
                            src="./images/design/s4-02-0215.mp4"
                          ></video>
                          <img class="section-static-frame" src="./images/design/s4-02-0215.jpg" alt="" />
                        </div>
                      </div>
                      <div class="section-button-wrapper align-button">
                        <div class="section-video-button section-replay-all will-fadein">
                          <span
                            class="section-video-copy ga-screen-click"
                            data-title-name="MagicOS"
                            data-button-name="再次播放"
                            >再次播放</span
                          >
                        </div>
                      </div>
                    </div>
                    <div id="section-d4-v3" class="section-design-video">
                      <div class="section-video-wrapper">
                        <div class="section-inline-video">
                          <video
                            muted
                            playsinline
                            webkit-playsinline
                            x-webkit-airplay
                            x5-video-player-fullscreen
                            x5-video-player-type="h5"
                            src="./images/design/s4-03.mp4"
                          ></video>
                          <img class="section-static-frame" src="./images/design/s4-03.jpg" alt="" />
                        </div>
                      </div>
                      <div class="section-button-wrapper align-button">
                        <div class="section-video-button section-replay-all will-fadein">
                          <span
                            class="section-video-copy ga-screen-click"
                            data-title-name="MagicOS"
                            data-button-name="再次播放"
                            >再次播放</span
                          >

                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="section-frame aspect-ratio">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> -->

        <section class="section-smart-2 will-change section-spacers is-visible">
          <div class="section-wrapper">
            <div class="section-content">
              <h3 class="section-headline">系统级卡片建议</h3>
              <p class="section-intro">
                基于运动场景智能推荐 300+个系统级卡片建议
                <sup>2</sup>
                。
              </p>
            </div>
            <div class="section-scroll-card" id="section-smart-2-card">
              <div class="section-cards-wrapper section-odd">
                <div class="section-cards section-cards-1">
                  <div id="section-smart-2-p1" class="section-picture will-transform">
                    <div class="section-card aspect-ratio">
                      <picture>
                        <img class="blur-up lazyload" src="./images/smart/s2-card-01.png" alt="" />
                      </picture>
                    </div>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-02.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-03.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-04.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-05.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-06.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-07.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-08.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-09.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-10.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-11.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-12.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-13.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-14.png" alt="" />
                    </picture>
                  </div>
                </div>
              </div>
              <div class="section-cards-wrapper section-even">
                <div class="section-cards section-cards-2">
                  <div id="section-smart-2-p2" class="section-picture will-transform">
                    <div class="section-card aspect-ratio">
                      <picture>
                        <img class="blur-up lazyload" src="./images/smart/s2-card-01.png" alt="" />
                      </picture>
                    </div>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-02.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-03.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-04.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-05.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-06.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-07.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-08.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-09.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-10.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-11.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-12.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-13.png" alt="" />
                    </picture>
                    <picture class="section-card">
                      <img class="blur-up lazyload" src="./images/smart/s2-card-14.png" alt="" />
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Honor",
}
</script>
<script setup>
// 参考链接：https://www.hihonor.com/cn/magic-os/
import { ref, onMounted } from "vue"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const screenWidth = document.documentElement.clientWidth,
  screenHeight = document.documentElement.clientHeight
const stickyNavHeight = 65
const isPortrait = false
let MAIN = null
const scrubTime = 0.5

gsap.registerPlugin(ScrollTrigger)

gsap.registerEffect({
  name: "tech4",
  extendTimeline: true,
  effect: function (targets) {
    let tl = gsap
      .timeline()
      .from(targets[0], {
        duration: 0.5,
        scale: 5,
        yPercent: 80,
      })
      .to(targets[1], {
        duration: 0.5,
        opacity: 1,
      })
      .fromTo(
        targets[2],
        {
          y: 60,
        },
        {
          y: 0,
          opacity: 1,
        },
      )

    if (targets[3]) {
      tl.fromTo(
        targets[3],
        {
          y: 60,
        },
        {
          y: 0,
          autoAlpha: 1,
        },
      )
    }

    tl.to(
      targets[4],
      {
        yPercent: -10,
      },
      "<",
    ).set({}, {}, "+=0.2")

    return tl
  },
})

const U = {
  addClass: function (element, classname) {
    if (classname) {
      return function () {
        element.classList.add(classname)
      }
    }
  },
  removeClass: function (element, classname) {
    if (classname) {
      return function () {
        element.classList.remove(classname)
      }
    }
  },
}

const stickyCenter = (stickyEl, wrapper) => {
  const bodyHeight = wrapper.offsetHeight,
    center = (screenHeight - stickyNavHeight - bodyHeight) / 2,
    top = center > 0 ? center + stickyNavHeight : stickyNavHeight

  stickyEl.style.top = top + "px"
  stickyEl.setAttribute("data-top", top)
}

const heroFn = () => {
  const sectionHero = document.getElementById("section-hero")
  gsap.timeline({
    scrollTrigger: {
      trigger: sectionHero,
      toggleClass: "animated",
    },
  })
}

const triggerFn = () => {
  const triggerList = document.querySelectorAll(".fade-trigger")
  triggerList.forEach((item) => {
    const hook = item.getAttribute("data-hook") || "70%"
    console.log(hook, "hook")
    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top " + hook,
        toggleClass: "active",
        markers: false,
      },
    })
  })
}

const groupFn = () => {
  const groupList = document.querySelectorAll(".fade-group")

  groupList.forEach((item) => {
    const hook = item.getAttribute("data-hook") || "70%"
    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        toggleClass: "active",
      },
    })
  })
}

const connect5Fn = () => {
  const picture = document.getElementById("section-c5-p")
  gsap.timeline({
    scrollTrigger: {
      trigger: picture,
      toggleClass: "animated",
    },
  })
}

// 第四屏动画
const magicRingFn = () => {
  const section = MAIN.querySelector(".section-magic-ring"),
    wrapper = section.querySelector(".section-wrapper"),
    headline = section.querySelector(".section-headline"),
    subhead = section.querySelector(".section-subhead"),
    link = section.querySelector(".section-link"),
    svg = section.querySelector(".magic-svg"),
    path = section.querySelectorAll(".magic-path"),
    circle = section.querySelector(".magic-circle")

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top " + stickyNavHeight,
        end: "bottom 100%",
        scrub: scrubTime,
      },
    })
    .to(path, {
      duration: 0.5,
      strokeDasharray: "0% 0% 220%",
    })
    .to(circle, {
      duration: 0.5,
      opacity: 1,
    })
    .from(
      path,
      {
        duration: 0.5,
        stroke: "#d7a85b",
        strokeWidth: 2,
      },
      "<",
    )
    .tech4([svg, headline, subhead, link, wrapper], "<")
}

const cardViewFn = () => {
  const sections = document.querySelectorAll(".section-card-view")

  sections.forEach((section) => {
    const stickyWrapper = section.querySelector(".sticky-wrapper"),
      stickyContent = section.querySelector(".sticky-content"),
      wrapper = section.querySelector(".section-wrapper"),
      headline = section.querySelector(".section-main-headline") || null,
      cards = wrapper.querySelectorAll(".section-card"),
      cardsXS = wrapper.querySelectorAll(".section-card-xs"),
      cardsNumber = cards.length,
      cardWidth = cards[0].clientWidth,
      cardMargin = Number(
        window.getComputedStyle(cards[1]).getPropertyValue("margin-left").slice(0, -2),
      ),
      cardScroll = cardWidth + cardMargin,
      swiperOffset =
        wrapper.getBoundingClientRect().left * 2 +
        cardWidth * cardsNumber +
        cardMargin * (cardsNumber - 1) -
        screenWidth

    // pc端
    stickyCenter(stickyContent, stickyContent)
    const stickyTop = Number(stickyContent.getAttribute("data-top"))

    ScrollTrigger.create({
      trigger: cards[0],
      start: "bottom bottom",
      end: "bottom bottom",
      // markers: true,
      onEnter: function () {
        cards[0].classList.add("animated")
      },
    })

    gsap.to(wrapper, {
      scrollTrigger: {
        trigger: stickyWrapper,
        start: "top " + stickyNavHeight,
        end: "bottom 100%",
        scrub: 0,
      },
      ease: "none",
      x: -swiperOffset,
    })

    cards.forEach(function (card, index) {
      if (index > 0) {
        const startTrigger = stickyTop - cardScroll * (index - 1)

        gsap.to(cards[index - 1], {
          scrollTrigger: {
            trigger: stickyWrapper,
            start: "top " + (stickyTop - cardWidth * index + cardWidth * 0.5),
            end: "+=" + cardWidth * 0.5,
            scrub: 0,
          },
          x: -(screenWidth - cardWidth) / 2,
        })

        gsap.to(card.querySelector(".section-card-content"), {
          scrollTrigger: {
            trigger: card,
            start: "top " + startTrigger,
            end: "+=" + cardScroll / 3,
            scrub: 0,
            // markers: {indent: 100 * index},
          },
          ease: "none",
          filter: "blur(0px)",
          scale: 1,
        })

        ScrollTrigger.create({
          trigger: card,
          start: "top " + (startTrigger - cardWidth * 0.8),
          end: "bottom bottom",
          // markers: true,
          onEnter: function () {
            card.classList.add("animated")
          },
        })

        ScrollTrigger.create({
          trigger: card,
          start: "top " + startTrigger,
          end: "bottom bottom",
          // markers: true,
          onEnterBack: function () {
            card.classList.remove("animated")
          },
        })
      }
    })
  })
}

const magicLive = () => {
  const section = MAIN.querySelector(".section-magic-live"),
    wrapper = section.querySelector(".section-wrapper"),
    headline = section.querySelector(".section-headline"),
    subhead = section.querySelector(".section-subhead"),
    svg = section.querySelector(".magic-svg"),
    path = section.querySelectorAll(".magic-path"),
    pathGold = section.querySelectorAll(".magic-path-gold"),
    pathBlack = section.querySelectorAll(".magic-path-black")

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top " + stickyNavHeight,
        end: "bottom 100%",
        scrub: scrubTime,
      },
    })
    .to(pathGold, {
      duration: 0.5,
      strokeDasharray: "0% 0% 210%",
    })
    .to(pathBlack, {
      duration: 0.5,
      opacity: 1,
    })
    .from(path, {
      duration: 0.5,
      strokeWidth: 2,
    })
    .tech4([svg, headline, subhead, null, wrapper], "<")
}

const service1 = () => {
  const screenHeightFix = isPortrait ? screenHeight + 100 : screenHeight,
    wrapper = document.getElementById("section-service-1"),
    picture = document.getElementById("section-s1-p"),
    content = wrapper.querySelector(".sticky-content"),
    copy = document.getElementById("section-s1-c1"),
    windowWidth = isPortrait ? 360 : 1920,
    top = ((isPortrait ? 100 : 300) / windowWidth) * window.innerWidth,
    copyHeight = isPortrait ? copy.clientHeight : 0,
    topSpace = screenHeightFix - picture.clientHeight - copyHeight,
    stickyTop = topSpace > top ? topSpace : top,
    scaleEnd = screenHeightFix - stickyTop - copyHeight

  content.style.height = screenHeightFix - stickyTop + "px"
  content.style.top = stickyTop + "px"

  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#section-s1-p",
        start: "top 100%",
        end: "+=" + scaleEnd,
        scrub: scrubTime,
        // markers: true,
      },
    })
    .from("#section-s1-p", {
      scale: 0.8,
    })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#section-service-1",
        start: "top " + stickyTop,
        end: "bottom 100%",
        scrub: scrubTime,
        // markers: true,
      },
    })
    .set({}, {}, "+=0.2")
    .to("#section-service-card", {
      scale: 1.35,
    })
    .to("#section-s1-c1", {
      autoAlpha: 1,
    })
    .to("#section-s1-c1", {
      autoAlpha: 0,
    })
    .to("#section-s1-p2", {
      autoAlpha: 0,
    })
    .to(
      "#section-s1-p3",
      {
        autoAlpha: 1,
      },
      "<",
    )
    .to(
      "#section-s1-c2",
      {
        autoAlpha: 1,
      },
      "<",
    )
    .set({}, {}, "+=0.6")
}

// 十五屏幕
const turboX = () => {
  const section = MAIN.querySelector(".section-turbo-x"),
    wrapper = section.querySelector(".section-wrapper"),
    headline = section.querySelector(".section-headline"),
    subhead = section.querySelector(".section-subhead"),
    svg = section.querySelector(".magic-svg"),
    path = section.querySelectorAll(".magic-path"),
    pathCircle = section.querySelector(".magic-path-circle"),
    pathGold1 = section.querySelectorAll(".magic-path-gold .l1"),
    pathGold2 = section.querySelectorAll(".magic-path-gold .l2"),
    pathWhite1 = section.querySelectorAll(".magic-path-white .l1"),
    pathWhite2 = section.querySelectorAll(".magic-path-white .l2"),
    pathIcon = section.querySelector(".magic-path-icon")

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top " + stickyNavHeight,
        end: "bottom 100%",
        scrub: scrubTime,
      },
    })
    .to(pathCircle, {
      duration: 0.5,
      strokeDasharray: "0% 0% 200%",
    })
    .to(pathCircle, {
      duration: 0.5,
      stroke: "#fff",
    })
    .to(
      pathGold1,
      {
        duration: 0.5,
        strokeDasharray: "11% 11% 0%",
      },
      "<",
    )
    .to(
      pathGold2,
      {
        duration: 0.5,
        strokeDasharray: "0% 0% 11%",
      },
      "<",
    )
    .to(pathWhite1, {
      duration: 0.5,
      strokeDasharray: "11% 11% 0%",
    })
    .to(
      pathWhite2,
      {
        duration: 0.5,
        strokeDasharray: "0% 0% 11%",
      },
      "<",
    )
    .from(
      pathIcon,
      {
        duration: 0.5,
        opacity: 0,
      },
      "<",
    )
    .from(path, {
      duration: 0.5,
      strokeWidth: 2,
    })
    .tech4([svg, headline, subhead, null, wrapper], "<")
}

const performance = () => {
  const sections = MAIN.querySelectorAll(".section-start-2")

  sections.forEach(function (section) {
    const headlineWrapper = section.querySelector(".section-headline-wrapper"),
      headlineWrapperHeight = headlineWrapper.clientHeight,
      fillItem = section.querySelector(".section-fill-item"),
      maskItem = section.querySelector(".section-mask-item"),
      line1 = section.querySelector(".section-line-1"),
      line2 = section.querySelector(".section-line-2"),
      fill1 = section.querySelector(".section-fill-1"),
      fill2 = section.querySelector(".section-fill-2"),
      headlineMask = section.querySelector(".section-headline-mask"),
      content = section.querySelector(".section-content"),
      viewHeight = screenHeight - stickyNavHeight,
      contentHideY = viewHeight - content.offsetTop + 30,
      sw = isPortrait ? 360 : 1920,
      scaleR = isPortrait ? 18 : 72,
      centerY = -((scaleR / sw) * screenWidth),
      headlineCenterY = parseInt(
        (viewHeight - headlineWrapperHeight) / 2 - headlineWrapper.offsetTop,
      ),
      lineX = line1.clientWidth + headlineWrapper.offsetLeft

    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top " + stickyNavHeight,
          end: "bottom 100%",
          scrub: scrubTime,
          // markers: true,
        },
      })
      .from(fill1, {
        ease: "none",
        xPercent: 101,
      })
      .from(
        fill2,
        {
          ease: "none",
          xPercent: -101,
        },
        "<",
      )
      .fromTo(
        headlineMask,
        {
          "--gradient-left": "50%",
          "--gradient-right": "50%",
        },
        {
          "--gradient-left": "0%",
          "--gradient-right": "100%",
        },
        "-=1",
      )
      .to(
        headlineMask,
        {
          autoAlpha: 0,
        },
        "-=0.5",
      )
      .to(
        line1,
        {
          ease: "none",
          x: -lineX,
          opacity: 0,
        },
        "-=0.5",
      )
      .to(
        line2,
        {
          ease: "none",
          x: lineX,
          opacity: 0,
        },
        "<",
      )
      .to(fillItem, {
        scale: isPortrait ? 0.587 : 0.4,
        opacity: 0.6,
      })
      .from(
        maskItem,
        {
          scale: isPortrait ? 1 : 0.666667,
        },
        "<",
      )
      .fromTo(
        headlineWrapper,
        {
          y: headlineCenterY,
        },
        {
          duration: 1.5,
          ease: "none",
          y: centerY,
        },
      )
      .fromTo(
        content,
        {
          y: contentHideY,
        },
        {
          duration: 1.5,
          ease: "none",
          y: centerY,
        },
        "<",
      )
      .set({}, {}, "+=0.2")
  })
}

const magicGuard = () => {
  const section = MAIN.querySelector(".section-magic-guard"),
    wrapper = section.querySelector(".section-wrapper"),
    headline = section.querySelector(".section-headline"),
    subhead = section.querySelector(".section-subhead"),
    link = section.querySelector(".section-link"),
    svg = section.querySelector(".magic-svg"),
    path = section.querySelectorAll(".magic-path"),
    pathLine = section.querySelector(".magic-path-line"),
    pathIcon = section.querySelector(".magic-path-icon")

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top " + stickyNavHeight,
        end: "bottom 100%",
        scrub: scrubTime,
      },
    })
    .to(pathLine, {
      duration: 0.5,
      strokeDasharray: "0% 0% 260%",
    })
    .to(pathLine, {
      duration: 0.5,
      stroke: "#fff",
    })
    .to(
      pathIcon,
      {
        duration: 0.5,
        opacity: 1,
      },
      "<",
    )
    .from(path, {
      duration: 0.5,
      strokeWidth: 2,
    })
    .tech4([svg, headline, subhead, link, wrapper], "<")
}

const start3 = () => {
  const sections = MAIN.querySelectorAll(".section-start-3")

  sections.forEach(function (section) {
    const wrapper = section.querySelector(".section-wrapper"),
      headline = section.querySelector(".section-headline"),
      subhead = section.querySelector(".section-subhead"),
      link = section.querySelector(".section-link") || null

    let tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top " + stickyNavHeight,
          end: "bottom 100%",
          scrub: scrubTime,
        },
      })
      .set({}, {}, "+=0.2")
      .to(headline, {
        opacity: 1,
      })
      .fromTo(
        subhead,
        {
          y: 60,
        },
        {
          y: 0,
          opacity: 1,
        },
      )

    if (link) {
      tl.fromTo(
        link,
        {
          y: 60,
        },
        {
          y: 0,
          autoAlpha: 1,
        },
      )
    }

    tl.to(
      wrapper,
      {
        yPercent: -10,
      },
      "-=1",
    ).set({}, {}, "+=0.4")
  })
}

// 二十一屏
const design3 = () => {
  const wrapper = document.getElementById("section-design-3"),
    headlineWrapper = wrapper.querySelector(".section-honor-sans"),
    headlineWrapperHeight = headlineWrapper.clientHeight,
    headlineCenter = parseInt((screenHeight - stickyNavHeight - headlineWrapperHeight) / 2),
    content = wrapper.querySelector(".section-has-video"),
    contentHeight = content.clientHeight,
    headlineIntro = headlineWrapper.querySelector(".section-intro"),
    headlineIntroHeight = headlineIntro.clientHeight,
    viewHeight = screenHeight - stickyNavHeight,
    center = parseInt((viewHeight - headlineWrapperHeight - contentHeight) / 2),
    headlineY = viewHeight - content.offsetTop

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".section-design-3",
        start: "top " + stickyNavHeight,
        end: "bottom 100%",
        scrub: scrubTime,
        // markers: true,
      },
    })
    .set({}, {}, "+=0.2")
    .fromTo(
      ".section-text-wrapper",
      {
        opacity: 0,
        scale: 10,
      },
      {
        opacity: 0.8,
        scale: 1,
      },
    )
    .from(
      ".section-spilt-1 .section-s1",
      {
        x: "-9vw",
        y: "-6vw",
      },
      "<",
    )
    .from(
      ".section-spilt-1 .section-s2",
      {
        x: "5vw",
        y: "-12vw",
      },
      "<",
    )
    .from(
      ".section-spilt-1 .section-s3",
      {
        x: "-7vw",
        y: "4vw",
      },
      "<",
    )
    .from(
      ".section-spilt-1 .section-s4",
      {
        x: "5vw",
        y: "10vw",
      },
      "<",
    )
    .from(
      ".section-spilt-1 .section-s5",
      {
        x: "6vw",
        y: "-10vw",
      },
      "<",
    )
    .from(
      ".section-spilt-2 .section-s6",
      {
        x: "-11vw",
        y: "-3vw",
      },
      "<",
    )
    .from(
      ".section-spilt-2 .section-s7",
      {
        x: "-11vw",
        y: "13vw",
      },
      "<",
    )
    .from(
      ".section-spilt-2 .section-s8",
      {
        x: "-11vw",
        y: "3vw",
      },
      "<",
    )
    .from(
      ".section-spilt-2 .section-s9",
      {
        x: "-15vw",
        y: "-14vw",
      },
      "<",
    )
    .from(
      ".section-spilt-2 .section-s10",
      {
        x: "9vw",
        y: "10vw",
      },
      "<",
    )
    .from(
      ".section-spilt-2 .section-s11",
      {
        x: "5vw",
        y: "-9vw",
      },
      "<",
    )
    .from(
      ".section-spilt-2 .section-s19",
      {
        x: "6vw",
        y: "-11vw",
      },
      "<",
    )
    .from(
      ".section-spilt-2 .section-s12",
      {
        x: "-4vw",
        y: "-3vw",
      },
      "<",
    )
    .from(
      ".section-spilt-3 .section-s13",
      {
        x: "6vw",
        y: "-9vw",
      },
      "<",
    )
    .from(
      ".section-spilt-3 .section-s14",
      {
        x: "-4vw",
        y: "3vw",
      },
      "<",
    )
    .from(
      ".section-spilt-3 .section-s15",
      {
        x: "10vw",
        y: "4vw",
      },
      "<",
    )
    .from(
      ".section-spilt-4 .section-s16",
      {
        x: "6vw",
        y: "11vw",
      },
      "<",
    )
    .from(
      ".section-spilt-4 .section-s17",
      {
        x: "6vw",
        y: "-9vw",
      },
      "<",
    )
    .from(
      ".section-spilt-4 .section-s18",
      {
        x: "-5vw",
        y: "-6vw",
      },
      "<",
    )
    .call(U.removeClass(wrapper, "animated"))
    .set({}, {}, "+=0.05")
    .call(U.addClass(wrapper, "animated"))
    .set({}, {}, "+=0.2")
    .to(".section-honor-sans .will-show", {
      opacity: 1,
    })
    .to(headlineIntro, {
      opacity: 0,
    })
    .fromTo(
      headlineWrapper,
      {
        y: headlineCenter,
      },
      {
        y: center + headlineIntroHeight / 2,
      },
      "<",
    )
    .fromTo(
      content,
      {
        y: headlineY,
      },
      {
        y: center - headlineIntroHeight / 2,
      },
      "<",
    )
    .set({}, {}, "+=0.2")
}

const design4 = () => {
  const section = document.getElementById("section-d4-wrapper"),
    stickyContent = section.querySelector(".sticky-content"),
    video = document.getElementById("section-d4-video"),
    copy1 = document.getElementById("section-d4-c1"),
    copy2 = document.getElementById("section-d4-c2"),
    copy3 = document.getElementById("section-d4-c3"),
    videoWrappers = section.querySelectorAll(".section-design-video"),
    videoWrapper1 = document.getElementById("section-d4-v1"),
    videoWrapper2 = document.getElementById("section-d4-v2"),
    videoWrapper3 = document.getElementById("section-d4-v3"),
    video1 = videoWrapper1.querySelector("video"),
    video2 = videoWrapper2.querySelector("video"),
    video3 = videoWrapper3.querySelector("video")

  videoWrappers.forEach(function (videoWapper, index) {
    const video = videoWapper.querySelector("video"),
      replay = videoWapper.querySelector(".section-video-button")

    video.addEventListener("playing", function () {
      replay.classList.remove("active")
    })
    video.addEventListener("ended", function () {
      replay.classList.add("active")
    })
    replay.addEventListener("click", function () {
      video.play()
    })
  })

  stickyCenter(stickyContent, video)

  const stickyTop = Number(stickyContent.getAttribute("data-top")),
    copy1Height = copy1.clientHeight,
    copy2Height = copy2.clientHeight,
    copy3Height = copy3.clientHeight,
    maxCopyHeight = Math.max(copy1Height, copy2Height, copy3Height),
    space = (screenHeight - maxCopyHeight) / 2,
    bottomY = isPortrait ? maxCopyHeight * 1.5 : space + copy3Height,
    topY = isPortrait ? -(stickyTop + maxCopyHeight) : -(space + maxCopyHeight),
    top2 = isPortrait ? copy1Height - copy2Height : 0,
    top3 = isPortrait ? copy1Height - copy3Height : 0

  gsap
    .timeline({
      scrollTrigger: {
        trigger: video,
        start: "top 100%",
        end: "+=80%",
        scrub: scrubTime,
        // markers: true,
      },
    })
    .from(video, {
      scale: 0.8,
    })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top " + stickyNavHeight,
        end: "bottom 100%",
        scrub: scrubTime,
        // markers: true,
      },
    })
    .fromTo(
      copy1,
      {
        opacity: 0,
        y: bottomY,
      },
      {
        opacity: 1,
        y: 0,
      },
    )
    .call(
      function () {
        videoWrapper1.classList.add("active")
        videoWrapper2.classList.remove("active")
        videoWrapper3.classList.remove("active")
        if (!video1.classList.contains("played")) {
          setTimeout(function () {
            video1.play()
          }, 200)
        }
      },
      null,
      isPortrait ? "-=0.5" : "-=0.3",
    )
    .to(copy1, {
      delay: 0.5,
      opacity: 0,
      y: topY,
    })
    .fromTo(
      copy2,
      {
        opacity: 0,
        y: bottomY,
      },
      {
        opacity: 1,
        y: top2,
      },
      "<",
    )
    .call(
      function () {
        videoWrapper2.classList.add("active")
        videoWrapper1.classList.remove("active")
        videoWrapper3.classList.remove("active")
        if (!video2.classList.contains("played")) {
          setTimeout(function () {
            video2.play()
          }, 200)
        }
      },
      null,
      isPortrait ? "-=0.5" : "-=0.3",
    )
    .to(copy2, {
      delay: 0.5,
      opacity: 0,
      y: topY,
    })
    .fromTo(
      copy3,
      {
        opacity: 0,
        y: bottomY,
      },
      {
        opacity: 1,
        y: top3,
      },
      "<",
    )
    .call(
      function () {
        videoWrapper3.classList.add("active")
        videoWrapper1.classList.remove("active")
        videoWrapper2.classList.remove("active")
        if (!video3.classList.contains("played")) {
          setTimeout(function () {
            video3.play()
          }, 200)
        }
      },
      null,
      isPortrait ? "-=0.5" : "-=0.3",
    )
    .set({}, {}, "+=0.5")
}

const smart2 = () => {
  const card = document.getElementById("section-smart-2-card"),
    endHeight = screenHeight + card.clientHeight

  gsap
    .timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 100%",
        end: "+=" + endHeight,
        scrub: scrubTime,
        // markers: true,
      },
    })
    .to("#section-smart-2-p1", {
      ease: "none",
      xPercent: 50,
    })
    .to(
      "#section-smart-2-p2",
      {
        ease: "none",
        xPercent: -50,
      },
      "<",
    )
    .to(
      "#section-smart-2-p3",
      {
        ease: "none",
        xPercent: isPortrait ? 50 : 0,
      },
      "<",
    )
    .to(
      "#section-smart-2-p4",
      {
        ease: "none",
        xPercent: isPortrait ? -50 : 0,
      },
      "<",
    )
}
onMounted(() => {
  MAIN = document.querySelector(".honor")

  heroFn()
  triggerFn()
  groupFn()
  magicRingFn()
  connect5Fn()
  cardViewFn()
  magicLive()
  service1()
  turboX()
  performance()
  magicGuard()
  start3()
  design3()
  // design4();
  smart2()
})
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
