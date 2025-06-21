import { Outlet } from 'react-router-dom'

const RolesLayout = () => {
  return (
     <section className="mt-[12%] rounded-xl bg-gray-50 p-8 shadow">
      <Outlet />
    </section>
  )
}

export default RolesLayout
