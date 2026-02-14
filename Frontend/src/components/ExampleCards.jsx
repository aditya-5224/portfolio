import Card from './Card'
import './ExampleCards.css'

export default function ExampleCards() {
  const exampleCards = [
    {
      title: 'Electric Innovation',
      description: 'Cutting-edge technology meets creative design',
      color: '#7d95ff',
      content: 'Experience the power of dynamic animations with our electric border cards. Perfect for showcasing projects and achievements.'
    },
    {
      title: 'Neon Dreams',
      description: 'Glowing effects that captivate and inspire',
      color: '#ff006e',
      content: 'Each card features a smooth, animated electric border that responds to your interactions. Hover to see the magic unfold.'
    },
    {
      title: 'Digital Artistry',
      description: 'Canvas-based rendering for ultimate precision',
      color: '#ff00e1',
      content: 'Built with React and pure Canvas API, our cards deliver stunning visual effects without sacrificing performance.'
    }
  ]

  return (
    <div className="example-cards-container">
      <div className="example-cards-header">
        <h1 className="example-cards-title">Electric Border Cards</h1>
        <p className="example-cards-subtitle">Modern cards with animated neon borders</p>
      </div>
      
      <div className="cards-grid">
        {exampleCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            color={card.color}
          >
            <p className="card-example-content">{card.content}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
