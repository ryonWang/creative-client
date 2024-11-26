<template>
  <main
    class="ant-layout-content site-layout-background ease-in-out"
    style="margin: 0px; min-height: 280px"
  >
    <div class="personal-invite-history">
      <div class="page-title__container">
        <div class="page-title__text">邀请记录</div>
      </div>
      <div class="personal-invite-history-content">
        <div class="personal-invite-history-content__label">邀请结果</div>
        <table class="personal-invite-table">
          <thead class="personal-invite-table__header" style="width: 540px">
            <tr>
              <th style="width: 213px">邀请机构初级认证通过</th>
              <th style="width: 337px">初级认证累计奖励（会员套餐）</th>
            </tr>
          </thead>
          <tbody class="personal-invite-table__body">
            <tr>
              <td class="">0个</td>
              <td class="personal-invite-table__body--empty">暂无权益</td>
            </tr>
          </tbody>
        </table>
        <table class="personal-invite-table" style="margin-top: 16px">
          <thead
            class="personal-invite-table__header"
            style="width: 540px; background: rgb(217, 240, 255)"
          >
            <tr>
              <th style="width: 213px">邀请机构高级认证通过</th>
              <th style="width: 337px">高级认证累计奖励（现金）</th>
            </tr>
          </thead>
          <tbody class="personal-invite-table__body">
            <tr>
              <td class="">0个</td>
              <td class="personal-invite-table__body--empty">暂无权益</td>
            </tr>
          </tbody>
        </table>
        <div class="personal-invite-history-content-btn">
          <div class="personal-invite-history-content-btn-invite">立即邀请</div>
          <div class="personal-invite-history-content-btn-desc">
            您还未获得现金奖励，快去邀请获得奖励吧！
          </div>
        </div>
        <div class="personal-invite-history-content__label">邀请列表</div>
        <div class="personal-invite-list">
          <table class="personal-invite-list-table">
            <thead class="personal-invite-list-table__head">
              <tr>
                <th style="width: 160px">用户名</th>
                <th style="width: 131px">注册时间</th>
                <th style="width: 106px">认证项目</th>
                <th style="width: 106px">认证状态</th>
                <th style="width: 205px">权益内容</th>
              </tr>
            </thead>
          </table>
          <div class="personal-invite-list-table__empty">暂无数据</div>
        </div>
        <div
          class="personal-invite-history-content__label"
          style="margin-top: 48px"
        >
          活动奖励一览
        </div>
        <div class="personal-invite-history-content__title">初级认证奖励：</div>
        <table class="personal-invite-table">
          <thead class="personal-invite-table__header" style="width: 540px">
            <tr>
              <th style="width: 213px">完成初级认证邀请数</th>
              <th style="width: 337px">运营宝会员激励</th>
            </tr>
          </thead>
          <tbody class="personal-invite-table__body">
            <tr>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">满 1 个</td>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">
                价值1199元标准版3个月
              </td>
            </tr>
            <tr>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">满 2 个</td>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">
                价值1199元标准版6个月
              </td>
            </tr>
            <tr>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">满 3 个</td>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">
                价值1199元标准版1年
              </td>
            </tr>
            <tr>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">满 5 个</td>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">
                价值2499元专业版1年
              </td>
            </tr>
            <tr>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">
                满 10 个及以上
              </td>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">
                价值4899元旗舰版1年
              </td>
            </tr>
          </tbody>
        </table>
        <div class="personal-invite-history-content__title">高级认证奖励：</div>
        <table class="personal-invite-table">
          <thead class="personal-invite-table__header" style="width: 540px">
            <tr>
              <th style="width: 128px">推荐机构数</th>
              <th style="width: 170px">激励金</th>
              <th style="width: 266px">运营宝会员激励</th>
            </tr>
          </thead>
          <tbody class="personal-invite-table__body">
            <tr>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">1-3个</td>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">600元/个</td>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">
                3个内按600元/个奖励
              </td>
            </tr>
            <tr>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">4-6个</td>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">800元/个</td>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">
                第4个-第6个按800元进行奖励
              </td>
            </tr>
            <tr>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">7个以上</td>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">1000元/个</td>
              <td class="" style="color: rgba(0, 0, 0, 0.85)">
                第7个按1000元开始奖励
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
