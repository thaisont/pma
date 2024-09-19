import React from 'react'
import Card from '../component/card'

const Home = () => {
  return (
      <div className="flex gap-2 justify-center">
          <Card
              name="John Smith"
              department="Department of Computer Science"
              occupation="Student"
              age={20}
              description="First year student studying at UCL. Having difficulty adapting in London in terms of accommodation and culture."
              gender="Male"
              imageUrl="https://placehold.co/600x400" // Replace with actual image URL
          />
          <Card
              name="John Smith"
              department="Department of Computer Science"
              occupation="Student"
              age={20}
              description="First year student studying at UCL. Having difficulty adapting in London in terms of accommodation and culture."
              gender="Male"
              imageUrl="https://placehold.co/600x400" // Replace with actual image URL
          />
          <Card
              name="John Smith"
              department="Department of Computer Science"
              occupation="Student"
              age={20}
              description="First year student studying at UCL. Having difficulty adapting in London in terms of accommodation and culture."
              gender="Male"
              imageUrl="https://placehold.co/600x400" // Replace with actual image URL
          />
      </div>
  )
}

export default Home