<template>
  <section
    class="ant-layout"
    style="margin-left: 20px; padding-top: 20px; height: 100vh"
  >
    <main
      class="ant-layout-content site-layout-background"
      style="margin: 0px; min-height: 280px"
    >
      <div style="height: 100%">
        <section
          class="ant-layout ant-layout-has-sider manage-layout container-layout__wrapper"
        >
          <aside
            class="ant-layout-sider ant-layout-sider-light conainer_asider conainer_left_asider ease-in-out"
            style="
              flex: 0 0 200px;
              max-width: 200px;
              min-width: 200px;
              width: 200px;
            "
          >
            <div class="ant-layout-sider-children">
              <div class="left-pannel__wrapper material-left__pannel">
                <div class="menu-main-title__container">
                  <span>视频库</span>
                </div>
                <div class="tree-menu__container">
                  <div
                    role="tree"
                    class="ant-tree ant-tree-icon-hide tree-menu__wrapper"
                  >
                    <div>
                      <input
                        tabindex="0"
                        aria-label="for screen reader"
                        value=""
                        style="
                          width: 0px;
                          height: 0px;
                          display: flex;
                          overflow: hidden;
                          opacity: 0;
                          border: 0px;
                          padding: 0px;
                          margin: 0px;
                        "
                      />
                    </div>
                    <div
                      class="ant-tree-treenode"
                      aria-hidden="true"
                      style="
                        position: absolute;
                        pointer-events: none;
                        visibility: hidden;
                        height: 0px;
                        overflow: hidden;
                        border: 0px;
                        padding: 0px;
                      "
                    >
                      <div class="ant-tree-indent">
                        <div class="ant-tree-indent-unit"></div>
                      </div>
                    </div>
                    <div class="ant-tree-list" style="position: relative">
                      <div class="ant-tree-list-holder">
                        <div>
                          <div
                            class="ant-tree-list-holder-inner"
                            style="display: flex; flex-direction: column"
                          >
                            <div
                              class="ant-tree-treenode ant-tree-treenode-switcher-open ant-tree-treenode-selected ant-tree-treenode-leaf-last"
                              draggable="false"
                              aria-grabbed="false"
                            >
                              <span
                                aria-hidden="true"
                                class="ant-tree-indent"
                              ></span
                              ><span
                                class="ant-tree-switcher ant-tree-switcher_open"
                                ><span
                                  role="img"
                                  class="anticon ant-tree-switcher-icon"
                                  style="font-size: 16px"
                                  ><svg
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    focusable="false"
                                    class=""
                                  >
                                    <use
                                      xlink:href="#icon-vam-a-jiantou16"
                                    ></use></svg></span></span
                              ><span
                                title="我的视频"
                                class="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-open ant-tree-node-selected"
                                ><span class="ant-tree-title"
                                  ><div class="tree-menu__node root font-bold">
                                    <span
                                      class="menu-title text-overflow-hidden"
                                      >我的视频</span
                                    ><span
                                      class="suffix-icon"
                                    ></span></div></span
                              ></span>
                            </div>
                            <div
                              class="ant-tree-treenode ant-tree-treenode-switcher-open ant-tree-treenode-leaf-last"
                              draggable="false"
                              aria-grabbed="false"
                            >
                              <span aria-hidden="true" class="ant-tree-indent"
                                ><span
                                  class="ant-tree-indent-unit ant-tree-indent-unit-start ant-tree-indent-unit-end"
                                ></span></span
                              ><span
                                class="ant-tree-switcher ant-tree-switcher-noop"
                              ></span
                              ><span
                                title="绿布视频"
                                class="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-normal"
                                ><span class="ant-tree-title"
                                  ><div class="tree-menu__node font-bold">
                                    <span
                                      class="menu-title text-overflow-hidden"
                                      >绿布视频</span
                                    ><span class="suffix-icon"
                                      ><div>
                                        <div class="dropdown-select">
                                          <span
                                            role="img"
                                            class="anticon ant-dropdown-trigger"
                                            style="font-size: 16px"
                                            ><svg
                                              width="1em"
                                              height="1em"
                                              fill="currentColor"
                                              aria-hidden="true"
                                              focusable="false"
                                              class=""
                                            >
                                              <use
                                                xlink:href="#icon-vam-more"
                                              ></use></svg
                                          ></span>
                                        </div></div
                                    ></span></div></span
                              ></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <main
            class="ant-layout-content site-layout-background ease-in-out"
            style="margin: 0px; min-height: 280px"
          >
            <div class="drag-upload-filezone__container">
              <div class="video-list__content">
                <div class="video_header">
                  <div class="lib-header">
                    <div class="lib-header__top">
                      <div class="lib-header__title">
                        <div class="folder-info__container">
                          <div class="folder-info__title">视频库（2）</div>
                        </div>
                      </div>
                      <div class="lib-header__options">
                        <div class="lib-header-options">
                          <div
                            class="ant-space ant-space-horizontal ant-space-align-center"
                            style="gap: 16px"
                          >
                            <div class="ant-space-item" style="">
                              <div class="lib-header-sort">
                                <div
                                  class="ant-space ant-space-horizontal ant-space-align-center"
                                  style="gap: 0px"
                                >
                                  <div class="ant-space-item">
                                    <div class="ant-dropdown-trigger">
                                      <span>创建时间</span
                                      ><span
                                        role="img"
                                        class="anticon"
                                        style="margin-left: 5px"
                                        ><svg
                                          width="1em"
                                          height="1em"
                                          fill="currentColor"
                                          aria-hidden="true"
                                          focusable="false"
                                          class=""
                                        >
                                          <use
                                            xlink:href="#icon-vam-a-jiantou12"
                                          ></use></svg
                                      ></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="ant-space-item" style="">
                              <span
                                role="img"
                                class="anticon ant-dropdown-trigger"
                                style="font-size: 20px; cursor: pointer"
                                ><svg
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  focusable="false"
                                  class=""
                                >
                                  <use xlink:href="#icon-vam-list"></use></svg
                              ></span>
                            </div>
                            <div class="ant-space-item" style="">
                              <button
                                type="button"
                                class="ant-btn ant-btn-primary folder-create-btn"
                              >
                                <span>新 建</span>
                              </button>
                            </div>
                            <div class="ant-space-item">
                              <span
                                role="img"
                                tabindex="-1"
                                class="anticon right-pannel_icon"
                                ><svg
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  focusable="false"
                                  class=""
                                >
                                  <use
                                    xlink:href="#icon-vam-menu-right-pannel-hide"
                                  ></use></svg
                              ></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="lib-header__bottom">
                      <div
                        class="video_header__bottom video_header__bottom--hidden"
                      >
                        <div class="lib-list-header__batch-options">
                          <div class="lib-list-header__selected">
                            <label class="ant-checkbox-wrapper"
                              ><span class="ant-checkbox"
                                ><input
                                  class="ant-checkbox-input"
                                  type="checkbox" /><span
                                  class="ant-checkbox-inner"
                                ></span></span
                            ></label>
                            <div class="lib-list-header__selected-num">
                              已中0项
                            </div>
                          </div>
                          <div class="lib-list-header__menus">
                            <div class="lib-list-header__menu">
                              <span
                                role="img"
                                class="anticon lib-list-header__menu-icon"
                                ><svg
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  focusable="false"
                                  class=""
                                >
                                  <use
                                    xlink:href="#icon-vam-select-file-new-foder"
                                  ></use></svg></span
                              ><span class="lib-list-header__menu-title"
                                >用所选文件新建文件夹</span
                              >
                            </div>
                            <div class="lib-list-header__menu">
                              <span
                                role="img"
                                class="anticon lib-list-header__menu-icon"
                                ><svg
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  focusable="false"
                                  class=""
                                >
                                  <use
                                    xlink:href="#icon-vam-share"
                                  ></use></svg></span
                              ><span class="lib-list-header__menu-title"
                                >分享</span
                              >
                            </div>
                            <div class="lib-list-header__menu">
                              <span
                                role="img"
                                class="anticon lib-list-header__menu-icon"
                                ><svg
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  focusable="false"
                                  class=""
                                >
                                  <use
                                    xlink:href="#icon-vam-download1"
                                  ></use></svg></span
                              ><span class="lib-list-header__menu-title"
                                >下载</span
                              >
                            </div>
                            <div class="lib-list-header__menu">
                              <span
                                role="img"
                                class="anticon lib-list-header__menu-icon"
                                ><svg
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                  focusable="false"
                                  class=""
                                >
                                  <use
                                    xlink:href="#icon-vam-export"
                                  ></use></svg></span
                              ><span class="lib-list-header__menu-title"
                                >导出</span
                              >
                            </div>
                            <div class="dropdown-select">
                              <div
                                class="ant-dropdown-trigger lib-list-header__menu"
                              >
                                <span
                                  role="img"
                                  class="anticon lib-list-header__menu-icon"
                                  ><svg
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    focusable="false"
                                    class=""
                                  >
                                    <use
                                      xlink:href="#icon-vam-more"
                                    ></use></svg></span
                                ><span class="lib-list-header__menu-title"
                                  >更多</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="video_header__bottom">
                        <div>
                          <form
                            autocomplete="off"
                            class="ant-form ant-form-inline filter-form"
                          >
                            <div class="ant-form-item">
                              <div class="ant-row ant-form-item-row">
                                <div class="ant-col ant-form-item-control">
                                  <div class="ant-form-item-control-input">
                                    <div
                                      class="ant-form-item-control-input-content"
                                    >
                                      <div class="search-input">
                                        <span
                                          class="ant-input-affix-wrapper ant-input-affix-wrapper-sm ant-input-affix-wrapper-borderless"
                                          ><span class="ant-input-prefix"
                                            ><span
                                              role="img"
                                              class="anticon search-input-icon prefix"
                                              ><svg
                                                width="1em"
                                                height="1em"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                focusable="false"
                                                class=""
                                              >
                                                <use
                                                  xlink:href="#icon-vam-sousuo"
                                                ></use></svg></span></span
                                          ><input
                                            placeholder="请输入视频标题"
                                            data-log="srch_box"
                                            class="ant-input ant-input-sm ant-input-borderless"
                                            type="text"
                                            value="" /><span
                                            class="ant-input-suffix"
                                            ><span
                                              class="ant-input-clear-icon ant-input-clear-icon-hidden"
                                              role="button"
                                              tabindex="-1"
                                              ><span
                                                role="img"
                                                aria-label="close-circle"
                                                class="anticon anticon-close-circle"
                                                ><svg
                                                  fill-rule="evenodd"
                                                  viewBox="64 64 896 896"
                                                  focusable="false"
                                                  data-icon="close-circle"
                                                  width="1em"
                                                  height="1em"
                                                  fill="currentColor"
                                                  aria-hidden="true"
                                                >
                                                  <path
                                                    d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z"
                                                  ></path></svg></span></span></span
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="ant-form-item">
                              <div class="ant-row ant-form-item-row">
                                <div class="ant-col ant-form-item-control">
                                  <div class="ant-form-item-control-input">
                                    <div
                                      class="ant-form-item-control-input-content"
                                    >
                                      <div class="category-filter-wrapper">
                                        <div class="category-filter-select">
                                          <div
                                            class="ant-space ant-space-horizontal ant-space-align-center"
                                            style="gap: 5px"
                                          >
                                            <div
                                              class="ant-space-item"
                                              style=""
                                            >
                                              <div
                                                class="category-filter-select__title"
                                              >
                                                分类
                                              </div>
                                            </div>
                                            <div class="ant-space-item">
                                              <div class="select-options">
                                                <span
                                                  role="img"
                                                  class="anticon"
                                                  style="
                                                    transition: transform 0.3s;
                                                  "
                                                  ><svg
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    class=""
                                                  >
                                                    <use
                                                      xlink:href="#icon-vam-xiala2"
                                                    ></use></svg
                                                ></span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="ant-form-item">
                              <div class="ant-row ant-form-item-row">
                                <div class="ant-col ant-form-item-control">
                                  <div class="ant-form-item-control-input">
                                    <div
                                      class="ant-form-item-control-input-content"
                                    >
                                      <div
                                        class="tag-filter-wrapper"
                                        data-log="tags"
                                      >
                                        <div
                                          class="ant-dropdown-trigger tag-filter-select"
                                        >
                                          <div
                                            class="ant-space ant-space-horizontal ant-space-align-center"
                                            style="gap: 8px"
                                          >
                                            <div
                                              class="ant-space-item"
                                              style=""
                                            >
                                              <div
                                                class="tag-filter-select-title"
                                              >
                                                标签
                                              </div>
                                            </div>
                                            <div class="ant-space-item">
                                              <div class="select-options">
                                                <span
                                                  role="img"
                                                  class="anticon"
                                                  style="
                                                    transition: transform 0.3s;
                                                  "
                                                  ><svg
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    class=""
                                                  >
                                                    <use
                                                      xlink:href="#icon-vam-a-jiantou12"
                                                    ></use></svg
                                                ></span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="ant-form-item">
                              <div class="ant-row ant-form-item-row">
                                <div class="ant-col ant-form-item-control">
                                  <div class="ant-form-item-control-input">
                                    <div
                                      class="ant-form-item-control-input-content"
                                    >
                                      <div class="data-range-filter-wrapper">
                                        <div
                                          class="ant-picker ant-picker-range hidden-data-range"
                                        >
                                          <div
                                            class="ant-picker-input ant-picker-input-active"
                                          >
                                            <input
                                              readonly=""
                                              placeholder="开始日期"
                                              size="12"
                                              autocomplete="off"
                                              value=""
                                            />
                                          </div>
                                          <div
                                            class="ant-picker-range-separator"
                                          >
                                            <span
                                              aria-label="to"
                                              class="ant-picker-separator"
                                              ><span
                                                role="img"
                                                aria-label="swap-right"
                                                class="anticon anticon-swap-right"
                                                ><svg
                                                  viewBox="0 0 1024 1024"
                                                  focusable="false"
                                                  data-icon="swap-right"
                                                  width="1em"
                                                  height="1em"
                                                  fill="currentColor"
                                                  aria-hidden="true"
                                                >
                                                  <path
                                                    d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"
                                                  ></path></svg></span
                                            ></span>
                                          </div>
                                          <div class="ant-picker-input">
                                            <input
                                              readonly=""
                                              placeholder="结束日期"
                                              size="12"
                                              autocomplete="off"
                                              value=""
                                            />
                                          </div>
                                          <div
                                            class="ant-picker-active-bar"
                                            style="
                                              left: 0px;
                                              width: 0px;
                                              position: absolute;
                                            "
                                          ></div>
                                          <span class="ant-picker-suffix"
                                            ><span
                                              role="img"
                                              aria-label="calendar"
                                              class="anticon anticon-calendar"
                                              ><svg
                                                viewBox="64 64 896 896"
                                                focusable="false"
                                                data-icon="calendar"
                                                width="1em"
                                                height="1em"
                                                fill="currentColor"
                                                aria-hidden="true"
                                              >
                                                <path
                                                  d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"
                                                ></path></svg></span
                                          ></span>
                                        </div>
                                        <div class="data-range-filter-select">
                                          <div
                                            class="data-range-filter-select-title"
                                          >
                                            更新日期
                                          </div>
                                          <div class="select-options">
                                            <span role="img" class="anticon"
                                              ><svg
                                                width="1em"
                                                height="1em"
                                                fill="currentColor"
                                                aria-hidden="true"
                                                focusable="false"
                                                class=""
                                              >
                                                <use
                                                  xlink:href="#icon-vam-a-jiantou12"
                                                ></use></svg
                                            ></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              class="ant-btn ant-btn-round ant-btn-default ant-btn-sm filter-btn"
                              disabled=""
                            >
                              <span>重 置</span>
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    style="height: calc(-180px + 100vh); margin: 24px 24px 0px"
                  >
                    <div
                      class="material-list__container"
                      style="
                        grid-column: span 4;
                        grid-template-columns: repeat(4, 1fr);
                        grid-auto-rows: 251px;
                      "
                    >
                      <div
                        data-view-type="0"
                        class="video-card_wrapper"
                        style="margin: 3px; grid-row-end: span 1"
                      >
                        <div class="video-card">
                          <div class="lib-folder-card">
                            <div class="lib-folder-card__img">
                              <img
                                class="lib-folder-card__img-item"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAAB3CAYAAABfT+GYAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAuaADAAQAAAABAAAAdwAAAADq3qdgAAAQwUlEQVR4Ae2dXYgkVxXHT1V3VXdPT2d252OZrFli5sGYzIMBJZANKpIIkhdfEkHRlxBFENQ3ER/WQZRAyEOMigZFn/wgCSjogySB4FsENUEmQZQ1hrDZ3dnN7KRnpqe/qvyfqr7dVdVV3bd20tNV3edCTVVX3Xvr3v/91alzP7rHIJ3guoZONIkjCpyoAobh6twvGd40YG9tJeejUwqJIwokKXDhghbINAL4YTjHwR0H9Pb2cD5JhZbzooCuApub8YCPAj8G9jCcSYAHwQ4B/QjRzuvhPFQF6pfiz6vrshcFggrUzsYDzXHW7sa1Z/3YQfCTYI+APgAxDvA4uHc2/TRBiDd2e/lsDoq9f32Q9+CsHIkCyQosrgRA3/bjXTztn1MPgQJ+HOwB0AcgRiFXgCvLzXArsBnq/XU/baM+yKN50Du+LbkickUUGKnA2/7VUtWHu1Lz9/wAXLw0AD4Ke5xV74HuQzkS8J5LwoBvnAXcsNAMNgPdOu2nX2n4+9YR9msjqyAXRYGxCth1H+brFX9vA/jSrksMvGftYeXZwrN1X9t2SVn1KOhjIWcLrqy3stwe3AC7BcBru6YHdBtgd5rYqj7oXINuyz8+NbY6EkEUILrRE6Fg+1Dzx+KBf1wsuWSVXWLwGfpay/FhvwzLPgb0HuTFIY3ZTfFcFFjw+ouw3j3X5MZl07PctaZJZgeuy2mTaocGGQDarBhkdwF324e7gFz5uD6Uu5wQBYYVYF4KFqA+8q95x2Wca7hUdFyqd/x9rejQu/Aaqtg3YN03zjpwYZAGfcFtWHdl0dUd2EMB6AYFXZWgH85WfG3b9HxvBvygDKgt85tffGTlM5/+xGPlculLpknnCLmoPGUvCkxCAZfcvVa7+/Kb/73y5Je/891Xqdp2qL7qeC7M2gFAj1j0oNsCyIctedBNqaBzGQD8+9/+xu3n77nrGcuy7ut2HMIzJkEUmLgCMMdLZdv+7J0fuu3+5376xLcefuzrz9HSNXgaAH2/Bm/jMoayk4cg4VcnBHZT2AfnzuVyzfjK5z5/+t7Nu35iV6z72gC8C8AZctlEg0kzwKy1uw7cF2N1ZfnUD3/59BPn6cCCZ3HN9Iwwj/TxwIga3lYeSQ/tAeTKF1edTU7YBODcwWzsmQ9+6mMPWyXr40cN34KzEZdNNDhJBtrwUuyKWV1fXX70gU8+uEAtWHE2wmyM2ShzUEPe3gf/z7C7wuc5wQ5GS1o2OpXIqOKYtVr1Cx08si7XSoIoMCUFGuiLFgrWA+fv/cCZl17a+x+tmOiYYoSPO59szdc82xsq3TDkXkQkaGIIcaVr0J5jkFM2DdP8cJffSxJEgWkqAN+lYJnLy6UzKxi2fotaRQC+St78Db9YfZclBGoEcgwb0ot+An4NcAbNQ5PsNq9ptMSKT7N15d59BeCeu5ZRpsq+Se2yQy0MaTcwlL2B+RvugLLLsrVFxKMsGD0MQ64WW7GPQza8fbwGFpG44RqeEcdZCaJAJhQoAN0u5mccMLqCOZkWD7bHBx9y1elkv8b3x4l4qp5dFZ7oWXB8yOPzkLOiwMkqALfCceBK84Rjl/uO6EM2CSYY/MaEsCWPieCd6nZCkPP0zywYdc9xwx/e8zYLdUpqwpk6j8ZqtYLNtYbqlXw3u44lJpHOZwzkvU4nt3kHfnkBrwMDkCObAihYsohq8GRsM99IMNQ89NqEH3bUITrEqoQ2Nkwge3O4+a7dTCE9VBluu3a3Z8lrDGIMxoFUI67y04HW90LV+7teITqFUUW+yUwEzBJU8CwbeGg76FXvt4l2WzAI2LiOsmAhm608NADCfUfufLI1jwkJkPN68GYo+mqZjFsAOIzdTAYTRC9Bo0W8qW5grdCVBsDn15eE7CkAC+S2YMmphrLBIg0FHiV8vX82DDmPkVdKA/PPS2a50+p0jKWSqffV6H7W+Tpgy80Wgq33MiRYgDLvYLXne7DunlXPV3Vmu7RoEOVjUAeMElYsjghhyOMicg/WLLE/DsiR3xwEhtrGw30OhuI6Vn/uYGvhFSbuS8Ya3wGbGmE85L1MHACOCdS5Cniu6QyMRA0uzOVDl3bDHtxcaZGpygLtNG7zaMj5mz29Lz4w33PGuNeuLGaJrfoi5sXgq79ziKX9bNVxXiy7J1Hm/4yGPFh8ED6PkLMEqt7sq5cLfqf0AL46w85B653pR038q+6RGGFGL+jUW+nbNyo6iQJ6aUPOAw3qZoH0c3dYxnKe2+GrM+ANDKrXAfsBOvg93kfq4Vn/mBj9xotcizuf1AaDNdPhTOLy4Bix+eBk3PnEczEXUpcjJo9o+XiUi/XmIV7mmwcI+h1PjjwmaEPeN2djMpz1y8qIlOHClNEbX8IYexfzB8cKGg19s/knZH2z2YXSJT1AoUg3+SFYbtac1041sQKR3cU9EK5jVNSttSFXjasSzvs+OCFRSDJf8y7SMeof5Y3nNRfwFr3jFqK3AHob6wtpETeIRuR7+gsN+1f0Ie8nOUbJJakocAwFGEF+e5zDBPzda6XRg+OB++hDHkgkh6LAtBTgNyivobrn1lN3ogx/8crBv/vD61fUEvFI4QTyiCDyMfsK8Bebl2uVO3RLqg05O/54XCSIAlNXgDm0Cwa8c72gDTn7QxJEgawogFHFLuF7DuTiSz38y1tt/j1OXmg1HLQhj+3FDucnZ0SBySsAnDtddz/2Rt4328I/NKQNuUwGxUoqJ6egALsrnRQ/jqINeXBceAr1kluKAgMF2Hdmq6sZZBpDUyiJlnEF1pPLp2/Jk/OQK6JAphXQhlyGEDPdjnNVuLRfUdOGXIYQ54qjzFc2DY/ik2e+OaWAx1VA25KLu3JcqSX9+6WAuCvvl5KSz8wooG3J0/hAM6OOVGQmFNCGnN0VceBnos3zXwmwmGIuaMyPyEXkEGseEUQ+5kIBbUsu0/q5aM/5KGRKa6sNOb8exF2ZD4byUEtxV/LQSlLGE1NA25LLevITaxO50TgF2F3h9baaQRtyfj2kyFfz9hJNFEivQFoOxc1Or7GkyJkC2pZcRldy1rKzXNxJuSspR21mWWKpW84U0HZXBPKctawUt69AKndFQO/rJgfTVIBBTDFQrg0510kgn2bLyr2DCqRhURvyNJkGCyPHosC0FdCHXCifdlvJ/ZUCKVnU7niq/GUvCuRNAX1LnreaSXlFgZ4C+pCnfEWIwqLAxBRgFlPM7etDPrESS8aiQHoFUowg6n8zSAx5+oaQFNlQQL/jKZRno8WkFKkVEHcltWSSIG8KpINcrHne2nc2ywsOJ+OTM+AperSzqa7UKo8K6PvkeaydlFkUgALa7or39TdxVwSaDCiQ9rcQxZJnoNGkCJNVQNuSixGfbENI7pNTQB9yoXxyrSA5p1MgJYvirqSTV2LnUAF9S57DykmRRQFWQB/ylK8IkVcUmJgCYDENjuKuTKwlJOOsKKBvybNSYimHKAAFJjetL/KKAllQIA3hKK9Y8iw0mpRhogqITz5ReSXzLCggljwLrSBlmKgC+pCnGbOZaJElc1EACqTwy/UhF2VFgZwqID55ThtOiq2vgL4lF3dFX1WJmSkFtC25MJ6pdpPCpFBA35IjUwE9hbISdaIKpOh3ppgMAuEC+UTbTTKfkALalpzvL5BPqBUk24kqID75ROWVzLOggLYlZysuljwLTSZlYAXSsKgNOefqyo8LCWE5VEDclRw2mhQ5nQKjLfkNZGZbrno3yH9lTieuxD5BBS7jXsvx9wtDXjvr0iKQvrEXjm0Whe+wIvJp2gokDZRfPO1SLVy4BHflbT9WwR7494OjcA7ySRSYggKGiR+LKxSxNXwyrUoioQmQo9R2PZDoQHksU6iO3FIUSFBgv3e+WPJZrdT8/drdAXZjv/62TVSqIlIXVw9cMssuGa7nrojPkiC2nJ6OAuaRSwx4e/Ttwz55MC478hVs/Dow/Ccl9HgE48qxKHDCChiG6VABgyI8OHIKhthhRju9UjyL/Wa/RL67cuGCS5ubPsPsuLPZZx+Hn5Ii/PLDI7douIf9VHIgCkxTAYOcotnd9SD3+o07KA36kYsr6HRi8CQSwpacfZn6JX/Kx4bLYjXxuQPn3nFtt/NKw7AedJN6tZGM5aMoMBEFYJYXDffau9ff+4fnZcD6kg1LTgVscLUDFlzdPww5wczXYNF5GLHxJhJ3YckdwA6039v5ubl06/2OaVQcAV3pJ/sTVsCyiG4xmi89/9vn/0r78DKqpkvXMcpyBl7HRXyODB9y8RJGV/iJQLgOl6Wy5FBj0fnZL371crG9/yOzgFcFbiQz/L5E8veEFABwVomo3On888obbzz9zIuv1KnUdqiKzd4duCjsjbDrzS54L4Qh54scSfnlnJiHEjHK8sp//t186vHHn7xy6erXrtY7r+1j8MVh0jmHURvHkS0zGvD6o8xvQIYJ7W8oM7ySo3Kz8Zu3X/37o1/9wY//xYbXM8BsiHk0cPFyzx/nTmc4GOQGll1tbRm0vW3QzqZBa9sm7a8bdKNoUqlZoMaeSRXLpEOn8JGHHlopnDt/vmsvfRS9XCDe81+CeeE+pSIVCuZ4o18yzQLuwo/CyGAXyCgaSW+fQVLbNI1iwQ0/wIPL/SN4cWbZQo+jfyb+gMuGPMfnB5RR36IxpiYmrtsFTGeMiWe4hmFDw3HxuNS2SQXkOyZHvi9xRcbXxUC3bmwJ4QlDG9x4bH7wnE0LdY5VuG9zUTDEsAy3SEb/PwMZtQLV7U7999976te/e+Fvrx5RowsLbnY9K14/cujUukNXm47X6VzbDlty5BPxyQNFYGu+sUKeb163kcESjjHdv2DRa39+4Rq1/vBHWij/ibodg7ol9HexVxtns7AQyGwOD1kLCekVwBISOsRAHu95swA0z2w2sbc7DrVgwavoI7KbUl8F4DjHVrzBXkgE8N7dw5CzH7O1hU5qr5d68RLRGZ5FqiNDpFiBk3+ArQUbWCs51MRz14Wd6R6gQeHxL7DNgcPO4LtjRujTVz9fKaaJOOufx8AwMzcVMNTAMWGyp4OxcBNWegGdyobhwClHZzMCuGeQeZaz15eM1N1/LUTcDM9xV6BfveTQxgch2ptgfdWgFmZBayhAmy03XhXdqkE1vCg7+wC7l7tbyafIEXFy+9G044vebWe7XVwArUIVk5A8T1MH3G0w58K4Vlr4XHXIQT9RWXAG3Bsbhy8e6XCqrPxKRyFn35yD8s957Hxj1/B89EbdoOZpht2glQb2NT9u+8jfd5r+Xt1hXvcdPPwS0ivAS0k4qPUoFsbAefCDO5g8d1PCYAhPVrKLogBXbgqnC4yqKL/eb4go5Bw5DnQ+v3EWsF83iGHnoID3PvT+tAH/evCEHIsCMQq0YBi9iZyYaww1BwabZzN5BCUKN19PApyv9TqvA2szDnROxKMuHJRl59klBl4FBb76LPv5UKDJfbJjBm9RYCQPtaqQp+vZ31aWm6Mx3BzUcpSgBefzg9GZyJDTKNA5IbsvHBTsfKyWAfCxCuzaSBAF+grAGI4MMR1GBlqF4HqUcXCrNImQc4Q40Pm8cl/4mIMC3v+Ev48A/tcF7r4ecnBsBbx14YHJHWW1VcZR663OBwDnU/FQJoGuMokCr85ndT/0QGa1oFIuT4EozEFZksBWcSKA8+l4yFWCcbCreLIfftOJJjevwDiQ43KOgVtFGw25ihXcC/hBNeR4WgqMgDpapP8DYKtna6XwZqoAAAAASUVORK5CYII="
                                draggable="false"
                              />
                            </div>
                            <div class="lib-folder-card__content">
                              <div class="lib-folder-card__top">
                                <div class="lib-folder-card__count"></div>
                                <div class="lib-folder-card__info-title">
                                  绿布视频
                                </div>
                                <div class="lib-folder-card__info-update-time">
                                  2024-09-06 20:09
                                </div>
                              </div>
                              <div class="lib-folder-card__options">
                                <div class="lib-file-options">
                                  <div class="lib-file-options__item"></div>
                                  <div class="lib-file-options__item"></div>
                                  <div class="lib-file-options__item"></div>
                                  <div class="lib-file-options__item"></div>
                                  <div
                                    class="lib-file-options__item lib-file-options__item--active"
                                  >
                                    <div>
                                      <div class="dropdown-select">
                                        <span
                                          role="img"
                                          class="anticon ant-dropdown-trigger"
                                          ><svg
                                            width="1em"
                                            height="1em"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            focusable="false"
                                            class=""
                                          >
                                            <use
                                              xlink:href="#icon-vam-more"
                                            ></use></svg
                                        ></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-view-type="0"
                        class="video-card_wrapper"
                        style="margin: 3px; grid-row-end: span 1"
                      >
                        <div class="video-card">
                          <div
                            class="drag-wrapper lib-file-card"
                            draggable="true"
                          >
                            <label
                              class="ant-checkbox-wrapper lib-file-card__checkbox"
                              ><span class="ant-checkbox"
                                ><input
                                  class="ant-checkbox-input"
                                  type="checkbox" /><span
                                  class="ant-checkbox-inner"
                                ></span></span
                            ></label>
                            <div class="lib-file-card__content">
                              <div
                                class="lib-file-card__cover"
                                style="height: 56.25%"
                              >
                                <div class="video-cover">
                                  <div
                                    class="video-cover__img-container video-cover__img-container--active"
                                  >
                                    <div class="video-cover__img">
                                      <div class="cover-img">
                                        <div class="ant-image">
                                          <img
                                            class="ant-image-img cover-img__file"
                                            src="https://vimg.onevaas.com/6c26/20230106/7ogw5e9z2e8pky48nl1lqks8k49y3260.jpg?auth_key=1725858911-4-0-3066e6049e87734554eee0dcfdd1e9b9"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <img
                                      src="https://static.yilantv.com/Transformers/vam/yyb/prodBuild/0.7.22.31/static/mask.a01cbfa7.png"
                                      class="video-cover__img--mask"
                                    /><span
                                      role="img"
                                      class="anticon video-iconfont pointer"
                                      ><svg
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        focusable="false"
                                        class=""
                                      >
                                        <use
                                          xlink:href="#icon-vam-yunhang"
                                        ></use></svg
                                    ></span>
                                  </div>
                                  <div
                                    class="video-cover__tag video-cover__version"
                                  >
                                    v1
                                  </div>
                                  <div
                                    class="video-cover__tag video-cover__duration"
                                  >
                                    02:43
                                  </div>
                                </div>
                              </div>
                              <div class="lib-file-card__info">
                                <div class="lib-file-card__info-t">
                                  <div
                                    class="lib-file-card__info-title text-overflow-hidden"
                                  >
                                    一览运营宝产品介绍.mp4
                                  </div>
                                  <div class="lib-file-card__info-update-time">
                                    2024-07-23 18:54
                                  </div>
                                </div>
                                <div class="lib-file-card__info-b">
                                  <div class="lib-file-options">
                                    <div
                                      class="lib-file-options__item lib-file-options__item--active"
                                    >
                                      <span role="img" class="anticon"
                                        ><svg
                                          width="1em"
                                          height="1em"
                                          fill="currentColor"
                                          aria-hidden="true"
                                          focusable="false"
                                          class=""
                                        >
                                          <use
                                            xlink:href="#icon-vam-edit"
                                          ></use></svg
                                      ></span>
                                    </div>
                                    <div
                                      class="lib-file-options__item lib-file-options__item--active"
                                    >
                                      <span role="img" class="anticon"
                                        ><svg
                                          width="1em"
                                          height="1em"
                                          fill="currentColor"
                                          aria-hidden="true"
                                          focusable="false"
                                          class=""
                                        >
                                          <use
                                            xlink:href="#icon-vam-note"
                                          ></use></svg
                                      ></span>
                                    </div>
                                    <div
                                      class="lib-file-options__item lib-file-options__item--active"
                                    >
                                      <span role="img" class="anticon"
                                        ><svg
                                          width="1em"
                                          height="1em"
                                          fill="currentColor"
                                          aria-hidden="true"
                                          focusable="false"
                                          class=""
                                        >
                                          <use
                                            xlink:href="#icon-vam-share"
                                          ></use></svg
                                      ></span>
                                    </div>
                                    <div
                                      class="lib-file-options__item lib-file-options__item--active"
                                    >
                                      <span role="img" class="anticon"
                                        ><svg
                                          width="1em"
                                          height="1em"
                                          fill="currentColor"
                                          aria-hidden="true"
                                          focusable="false"
                                          class=""
                                        >
                                          <use
                                            xlink:href="#icon-vam-download1"
                                          ></use></svg
                                      ></span>
                                    </div>
                                    <div
                                      class="lib-file-options__item lib-file-options__item--active"
                                    >
                                      <div>
                                        <div class="dropdown-select">
                                          <span
                                            role="img"
                                            class="anticon ant-dropdown-trigger"
                                            ><svg
                                              width="1em"
                                              height="1em"
                                              fill="currentColor"
                                              aria-hidden="true"
                                              focusable="false"
                                              class=""
                                            >
                                              <use
                                                xlink:href="#icon-vam-more"
                                              ></use></svg
                                          ></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <aside
            class="ant-layout-sider ant-layout-sider-light conainer_asider conainer_right_asider ease-in-out"
            style="
              flex: 0 0 264px;
              max-width: 264px;
              min-width: 264px;
              width: 264px;
            "
          >
            <div class="ant-layout-sider-children">
              <div class="right-pannel__wrapper">
                <div class="pannel-title-box">
                  <div class="pannel-title">文件夹</div>
                </div>
                <div
                  class="ant-divider ant-divider-horizontal pannel__divider"
                  role="separator"
                ></div>
                <div class="pannel-content__wrapper">
                  <div class="ant-row pannel-item">
                    <div class="ant-col ant-col-10 pannel-item__label">
                      文件数
                    </div>
                    <div class="ant-col ant-col-14 pannel-item__value">1</div>
                  </div>
                  <div class="ant-row pannel-item">
                    <div class="ant-col ant-col-10 pannel-item__label">
                      占用空间
                    </div>
                    <div class="ant-col ant-col-14 pannel-item__value">
                      4.12 MB
                    </div>
                  </div>
                  <div class="ant-row pannel-item">
                    <div class="ant-col ant-col-10 pannel-item__label">
                      创建时间
                    </div>
                    <div class="ant-col ant-col-14 pannel-item__value">
                      2024-07-23 18:54
                    </div>
                  </div>
                  <div class="ant-row pannel-item">
                    <div class="ant-col ant-col-10 pannel-item__label">
                      更新时间
                    </div>
                    <div class="ant-col ant-col-14 pannel-item__value">
                      2024-07-23 18:54
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>
        <div class="file-options-copy"></div>
        <div class="file-options-move"></div>
        <div class="folder-options-rename"></div>
        <div class="share-modal share-info-modal">
          <div class="ant-modal-root">
            <div
              tabindex="-1"
              class="ant-modal-wrap ant-modal-centered"
              style="display: none"
            >
              <div
                role="dialog"
                aria-labelledby="rc_unique_62"
                aria-modal="true"
                class="ant-modal"
                style="display: none; width: 454px"
              >
                <div
                  tabindex="0"
                  aria-hidden="true"
                  style="
                    width: 0px;
                    height: 0px;
                    overflow: hidden;
                    outline: none;
                  "
                ></div>
                <div class="ant-modal-content">
                  <button
                    type="button"
                    aria-label="Close"
                    class="ant-modal-close"
                  >
                    <span class="ant-modal-close-x"
                      ><svg
                        t="1656330647955"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2162"
                        width="16"
                        height="16"
                      >
                        <path
                          d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z"
                          p-id="2163"
                          fill="#333333"
                        ></path></svg
                    ></span>
                  </button>
                  <div class="ant-modal-header">
                    <div class="ant-modal-title" id="rc_unique_62">
                      创建分享
                    </div>
                  </div>
                  <div class="ant-modal-body">
                    <form
                      id="create-share-form"
                      class="ant-form ant-form-horizontal"
                    >
                      <div class="ant-form-item share-input-title">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_shareTitle"
                              class="ant-form-item-no-colon"
                              title="分享名称"
                              >分享名称</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <input
                                  placeholder="请输入分享标题"
                                  id="create-share-form_shareTitle"
                                  class="ant-input"
                                  type="text"
                                  value=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ant-form-item">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_isSharePwd"
                              class="ant-form-item-no-colon"
                              title="启用密码"
                              >启用密码</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <button
                                  id="create-share-form_isSharePwd"
                                  type="button"
                                  role="switch"
                                  aria-checked="true"
                                  class="ant-switch ant-switch-checked"
                                >
                                  <div class="ant-switch-handle"></div>
                                  <span class="ant-switch-inner"></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ant-form-item share-input-pwd">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_sharePwd"
                              class="ant-form-item-no-colon"
                              title="密码"
                              >密码</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <input
                                  maxlength="4"
                                  placeholder="密码"
                                  id="create-share-form_sharePwd"
                                  class="ant-input"
                                  type="text"
                                  value="oIvz"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ant-form-item">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_isShareTermValidity"
                              class="ant-form-item-no-colon"
                              title="有效期"
                              >有效期</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <button
                                  id="create-share-form_isShareTermValidity"
                                  type="button"
                                  role="switch"
                                  aria-checked="false"
                                  class="ant-switch"
                                >
                                  <div class="ant-switch-handle"></div>
                                  <span class="ant-switch-inner"></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ant-form-item">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_isShareMark"
                              class="ant-form-item-no-colon"
                              title="添加水印"
                              >添加水印</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <button
                                  id="create-share-form_isShareMark"
                                  type="button"
                                  role="switch"
                                  aria-checked="false"
                                  class="ant-switch"
                                >
                                  <div class="ant-switch-handle"></div>
                                  <span class="ant-switch-inner"></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ant-form-item">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_isShareDownload"
                              class="ant-form-item-no-colon"
                              title="允许下载"
                              >允许下载</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <button
                                  id="create-share-form_isShareDownload"
                                  type="button"
                                  role="switch"
                                  aria-checked="true"
                                  class="ant-switch ant-switch-checked"
                                >
                                  <div class="ant-switch-handle"></div>
                                  <span class="ant-switch-inner"></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="ant-form-item">
                        <div class="ant-row ant-form-item-row">
                          <div
                            class="ant-col ant-form-item-label ant-form-item-label-left"
                          >
                            <label
                              for="create-share-form_isShareAnnotation"
                              class="ant-form-item-no-colon"
                              title="允许批注"
                              >允许批注</label
                            >
                          </div>
                          <div class="ant-col ant-form-item-control">
                            <div class="ant-form-item-control-input">
                              <div class="ant-form-item-control-input-content">
                                <button
                                  id="create-share-form_isShareAnnotation"
                                  type="button"
                                  role="switch"
                                  aria-checked="true"
                                  class="ant-switch ant-switch-checked"
                                >
                                  <div class="ant-switch-handle"></div>
                                  <span class="ant-switch-inner"></span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div class="share-operate">
                      <button
                        type="button"
                        class="ant-btn ant-btn-primary ant-btn-lg share-btn link-share"
                      >
                        <span role="img" class="anticon"
                          ><svg
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            focusable="false"
                            class=""
                          >
                            <use
                              xlink:href="#icon-vam-lianjie"
                            ></use></svg></span
                        ><span>通过链接分享</span></button
                      ><button
                        type="button"
                        class="ant-btn ant-btn-default ant-btn-lg share-btn weixin-share"
                      >
                        <span role="img" class="anticon"
                          ><svg
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            aria-hidden="true"
                            focusable="false"
                            class=""
                          >
                            <use
                              xlink:href="#icon-vam-weixin1"
                            ></use></svg></span
                        ><span>通过微信分享</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  tabindex="0"
                  aria-hidden="true"
                  style="
                    width: 0px;
                    height: 0px;
                    overflow: hidden;
                    outline: none;
                  "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>
<script>
import workbenchMenu from "@/components/layout/nav/workbenchMenu.vue"
import { getToken } from "@/utils/auth";
export default {
    name: "workbenchMenu",
    components: {workbenchMenu,getToken},
}
</script>