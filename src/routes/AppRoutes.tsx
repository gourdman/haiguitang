import { Route, Routes } from 'react-router-dom'
import CategoryStories from '../pages/CategoryStories'
import Game from '../pages/Game'
import Home from '../pages/Home'
import Result from '../pages/Result'

/** 应用路由：大厅 → 分类故事列表 → 游戏 / 汤底 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryId" element={<CategoryStories />} />
      <Route path="/game/:id" element={<Game />} />
      <Route path="/result/:storyId" element={<Result />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
