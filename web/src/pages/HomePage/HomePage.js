import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags
        title="Home"
        description="An example Redwood application deployed on Layer0"
      />

      <h1>Redwood+Layer0 🚀</h1>
      <p>Woot!</p>
    </>
  )
}

export default HomePage
