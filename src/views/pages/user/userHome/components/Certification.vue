<template>
  <main
    class="ant-layout-content site-layout-background ease-in-out"
    style="margin: 0px; min-height: 280px"
  >
    <div class="personal-certification-center">
      <div class="page-title__container">
        <div class="page-title__text">认证中心</div>
      </div>
      <div class="ant-spin-nested-loading">
        <div class="ant-spin-container">
          <div class="personal-certification-center-content">
            <div class="personal-certification-center-content-desc">
              <span
                >MCN真实性认证<br />机构主体资质审核是对您账号主体的身份真实性核验，完成相关认证才可以开通订单广场商单合作等权益。</span
              >
            </div>
            <div class="personal-certification-center-content-form">
              <div class="personal-certification-center-content-form-title">
                填写MCN机构信息
              </div>
              <form
                class="ant-form ant-form-horizontal"
                style="width: 324px; margin-top: 24px"
              >
                <div
                  class="ant-form-item personal-certification-center-content-form-item"
                >
                  <div class="ant-row ant-form-item-row">
                    <div class="ant-col ant-form-item-label">
                      <label
                        for="name"
                        class="ant-form-item-required"
                        title="姓名"
                        >姓名</label
                      >
                    </div>
                    <div class="ant-col ant-form-item-control">
                      <div class="ant-form-item-control-input">
                        <div class="ant-form-item-control-input-content">
                          <input
                            id="name"
                            aria-required="true"
                            class="ant-input"
                            type="text"
                            value=""
                            style="width: 240px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="ant-form-item personal-certification-center-content-form-item"
                >
                  <div class="ant-row ant-form-item-row">
                    <div class="ant-col ant-form-item-label">
                      <label
                        for="phone"
                        class="ant-form-item-required"
                        title="手机号"
                        >手机号</label
                      >
                    </div>
                    <div class="ant-col ant-form-item-control">
                      <div class="ant-form-item-control-input">
                        <div class="ant-form-item-control-input-content">
                          <input
                            id="phone"
                            aria-required="true"
                            class="ant-input"
                            type="text"
                            value=""
                            style="width: 240px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="ant-form-item personal-certification-center-content-form-item"
                >
                  <div class="ant-row ant-form-item-row">
                    <div class="ant-col ant-form-item-label">
                      <label
                        for="company"
                        class="ant-form-item-required"
                        title="公司名称"
                        >公司名称</label
                      >
                    </div>
                    <div class="ant-col ant-form-item-control">
                      <div class="ant-form-item-control-input">
                        <div class="ant-form-item-control-input-content">
                          <input
                            id="company"
                            aria-required="true"
                            class="ant-input"
                            type="text"
                            value=""
                            style="width: 240px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="ant-form-item personal-certification-center-content-form-license"
                >
                  <div class="ant-row ant-form-item-row">
                    <div class="ant-col ant-form-item-label">
                      <label
                        for="img_jobid"
                        class="ant-form-item-required"
                        title="提交营业执照扫描件或照片"
                        >提交营业执照扫描件或照片</label
                      >
                    </div>
                    <div class="ant-col ant-form-item-control">
                      <div class="ant-form-item-control-input">
                        <div class="ant-form-item-control-input-content">
                          <div class="upload-contianer">
                            <span
                              ><div
                                class="ant-upload ant-upload-drag upload-contianer__dragger"
                              >
                                <span
                                  tabindex="0"
                                  class="ant-upload ant-upload-btn"
                                  role="button"
                                  ><input
                                    type="file"
                                    accept=".jpg,.png"
                                    style="display: none"
                                  />
                                  <div class="ant-upload-drag-container">
                                    <div class="upload-contianer__dragger--btn">
                                      上传附件
                                    </div>
                                  </div></span
                                >
                              </div></span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="personal-certification-center-content-form-title">
                  媒体账号
                </div>
                <div class="personal-certification-center-content-form-desc">
                  请至少填写您机构旗下的1个授权媒体账号
                </div>
                <div
                  class="ant-row personal-certification-center-content-form-externals"
                  style="margin-left: -8px; margin-right: -8px; row-gap: 16px"
                >
                  <div
                    class="ant-col ant-col-12"
                    style="padding-left: 8px; padding-right: 8px"
                  >
                    <div
                      class="personal-certification-center-content-form-externals-item"
                    >
                      <div
                        class="personal-certification-center-content-form-externals-item-index"
                      >
                        1
                      </div>
                      <div
                        class="personal-certification-center-content-form-externals-item-info"
                      >
                        <div>
                          <div
                            class="ant-form-item personal-certification-center-content-form-externals-item-info-id"
                          >
                            <div class="ant-row ant-form-item-row">
                              <div class="ant-col ant-form-item-label">
                                <label
                                  for="externals_0_external_id"
                                  class="ant-form-item-required"
                                  title="账号ID"
                                  >账号ID</label
                                >
                              </div>
                              <div class="ant-col ant-form-item-control">
                                <div class="ant-form-item-control-input">
                                  <div
                                    class="ant-form-item-control-input-content"
                                  >
                                    <input
                                      placeholder="请输入账号ID"
                                      id="externals_0_external_id"
                                      aria-required="true"
                                      class="ant-input"
                                      type="text"
                                      value=""
                                      style="width: 200px"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="ant-form-item personal-certification-center-content-form-externals-item-info-plat"
                          >
                            <div class="ant-row ant-form-item-row">
                              <div class="ant-col ant-form-item-label">
                                <label
                                  for="externals_0_external_plat"
                                  class="ant-form-item-required"
                                  title="平台"
                                  >平台</label
                                >
                              </div>
                              <div class="ant-col ant-form-item-control">
                                <div class="ant-form-item-control-input">
                                  <div
                                    class="ant-form-item-control-input-content"
                                  >
                                    <input
                                      placeholder="请输入平台"
                                      id="externals_0_external_plat"
                                      aria-required="true"
                                      class="ant-input"
                                      type="text"
                                      value=""
                                      style="width: 200px"
                                    />
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
                    class="ant-col ant-col-12"
                    style="padding-left: 8px; padding-right: 8px"
                  >
                    <div
                      class="personal-certification-center-content-form-externals-item"
                    >
                      <div
                        class="personal-certification-center-content-form-externals-item-index"
                      >
                        2
                      </div>
                      <div
                        class="personal-certification-center-content-form-externals-item-info"
                      >
                        <div>
                          <div
                            class="ant-form-item personal-certification-center-content-form-externals-item-info-id"
                          >
                            <div class="ant-row ant-form-item-row">
                              <div class="ant-col ant-form-item-label">
                                <label
                                  for="externals_1_external_id"
                                  class=""
                                  title="账号ID"
                                  >账号ID</label
                                >
                              </div>
                              <div class="ant-col ant-form-item-control">
                                <div class="ant-form-item-control-input">
                                  <div
                                    class="ant-form-item-control-input-content"
                                  >
                                    <input
                                      placeholder="请输入账号ID"
                                      id="externals_1_external_id"
                                      class="ant-input"
                                      type="text"
                                      value=""
                                      style="width: 200px"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="ant-form-item personal-certification-center-content-form-externals-item-info-plat"
                          >
                            <div class="ant-row ant-form-item-row">
                              <div class="ant-col ant-form-item-label">
                                <label
                                  for="externals_1_external_plat"
                                  class=""
                                  title="平台"
                                  >平台</label
                                >
                              </div>
                              <div class="ant-col ant-form-item-control">
                                <div class="ant-form-item-control-input">
                                  <div
                                    class="ant-form-item-control-input-content"
                                  >
                                    <input
                                      placeholder="请输入平台"
                                      id="externals_1_external_plat"
                                      class="ant-input"
                                      type="text"
                                      value=""
                                      style="width: 200px"
                                    />
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
                    class="ant-col ant-col-12"
                    style="padding-left: 8px; padding-right: 8px"
                  >
                    <div
                      class="personal-certification-center-content-form-externals-item"
                    >
                      <div
                        class="personal-certification-center-content-form-externals-item-index"
                      >
                        3
                      </div>
                      <div
                        class="personal-certification-center-content-form-externals-item-info"
                      >
                        <div>
                          <div
                            class="ant-form-item personal-certification-center-content-form-externals-item-info-id"
                          >
                            <div class="ant-row ant-form-item-row">
                              <div class="ant-col ant-form-item-label">
                                <label
                                  for="externals_2_external_id"
                                  class=""
                                  title="账号ID"
                                  >账号ID</label
                                >
                              </div>
                              <div class="ant-col ant-form-item-control">
                                <div class="ant-form-item-control-input">
                                  <div
                                    class="ant-form-item-control-input-content"
                                  >
                                    <input
                                      placeholder="请输入账号ID"
                                      id="externals_2_external_id"
                                      class="ant-input"
                                      type="text"
                                      value=""
                                      style="width: 200px"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="ant-form-item personal-certification-center-content-form-externals-item-info-plat"
                          >
                            <div class="ant-row ant-form-item-row">
                              <div class="ant-col ant-form-item-label">
                                <label
                                  for="externals_2_external_plat"
                                  class=""
                                  title="平台"
                                  >平台</label
                                >
                              </div>
                              <div class="ant-col ant-form-item-control">
                                <div class="ant-form-item-control-input">
                                  <div
                                    class="ant-form-item-control-input-content"
                                  >
                                    <input
                                      placeholder="请输入平台"
                                      id="externals_2_external_plat"
                                      class="ant-input"
                                      type="text"
                                      value=""
                                      style="width: 200px"
                                    />
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
                    class="ant-col ant-col-12"
                    style="padding-left: 8px; padding-right: 8px"
                  >
                    <div
                      class="personal-certification-center-content-form-externals-item"
                    >
                      <div
                        class="personal-certification-center-content-form-externals-item-index"
                      >
                        4
                      </div>
                      <div
                        class="personal-certification-center-content-form-externals-item-info"
                      >
                        <div>
                          <div
                            class="ant-form-item personal-certification-center-content-form-externals-item-info-id"
                          >
                            <div class="ant-row ant-form-item-row">
                              <div class="ant-col ant-form-item-label">
                                <label
                                  for="externals_3_external_id"
                                  class=""
                                  title="账号ID"
                                  >账号ID</label
                                >
                              </div>
                              <div class="ant-col ant-form-item-control">
                                <div class="ant-form-item-control-input">
                                  <div
                                    class="ant-form-item-control-input-content"
                                  >
                                    <input
                                      placeholder="请输入账号ID"
                                      id="externals_3_external_id"
                                      class="ant-input"
                                      type="text"
                                      value=""
                                      style="width: 200px"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="ant-form-item personal-certification-center-content-form-externals-item-info-plat"
                          >
                            <div class="ant-row ant-form-item-row">
                              <div class="ant-col ant-form-item-label">
                                <label
                                  for="externals_3_external_plat"
                                  class=""
                                  title="平台"
                                  >平台</label
                                >
                              </div>
                              <div class="ant-col ant-form-item-control">
                                <div class="ant-form-item-control-input">
                                  <div
                                    class="ant-form-item-control-input-content"
                                  >
                                    <input
                                      placeholder="请输入平台"
                                      id="externals_3_external_plat"
                                      class="ant-input"
                                      type="text"
                                      value=""
                                      style="width: 200px"
                                    />
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
                    class="ant-col ant-col-12"
                    style="padding-left: 8px; padding-right: 8px"
                  >
                    <div
                      class="personal-certification-center-content-form-externals-item"
                    >
                      <div
                        class="personal-certification-center-content-form-externals-item-index"
                      >
                        5
                      </div>
                      <div
                        class="personal-certification-center-content-form-externals-item-info"
                      >
                        <div>
                          <div
                            class="ant-form-item personal-certification-center-content-form-externals-item-info-id"
                          >
                            <div class="ant-row ant-form-item-row">
                              <div class="ant-col ant-form-item-label">
                                <label
                                  for="externals_4_external_id"
                                  class=""
                                  title="账号ID"
                                  >账号ID</label
                                >
                              </div>
                              <div class="ant-col ant-form-item-control">
                                <div class="ant-form-item-control-input">
                                  <div
                                    class="ant-form-item-control-input-content"
                                  >
                                    <input
                                      placeholder="请输入账号ID"
                                      id="externals_4_external_id"
                                      class="ant-input"
                                      type="text"
                                      value=""
                                      style="width: 200px"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="ant-form-item personal-certification-center-content-form-externals-item-info-plat"
                          >
                            <div class="ant-row ant-form-item-row">
                              <div class="ant-col ant-form-item-label">
                                <label
                                  for="externals_4_external_plat"
                                  class=""
                                  title="平台"
                                  >平台</label
                                >
                              </div>
                              <div class="ant-col ant-form-item-control">
                                <div class="ant-form-item-control-input">
                                  <div
                                    class="ant-form-item-control-input-content"
                                  >
                                    <input
                                      placeholder="请输入平台"
                                      id="externals_4_external_plat"
                                      class="ant-input"
                                      type="text"
                                      value=""
                                      style="width: 200px"
                                    />
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
                <button
                  type="submit"
                  class="ant-btn ant-btn-primary personal-certification-center-content-form-btn"
                >
                  <span>提 交</span>
                </button>
              </form>
              <div class="mcn-rule">
                <div class="mcn-rule-title">MCN认证规则</div>
                <div class="mcn-rule-content">
                  （1）MCN机构确保有1个或1个以上授权子账号；
                  <br />（2）MCN机构确保其所有子帐号的ID与运营平台一致；<br />（3）请确保旗下子帐号有授权关系，如盗用他人账号信息，认证将不予通过；<br />（4）请提交完整的机构主体认证资料，避免因错填、漏填信息认证失败。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
