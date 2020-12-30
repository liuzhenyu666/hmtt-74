import http from '@/utils/request.js'

export const reqGetArticles = (channelId, timestamp) => {
  return http({
    method: 'get',
    url: '/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: 1 // 包含置顶文章
    }
  })
}

export const reqDisLikeArticle = (articleId) => {
  return http({
    method: 'post',
    url: '/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}
