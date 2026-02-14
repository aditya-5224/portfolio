import ElectricBorder from './ElectricBorder'
import './Card.css'

export default function Card({
  title,
  description,
  children,
  color = '#7df9ff'
}) {
  return (
    /* key={title} ensures the electric effect resets properly when switching pages */
    <ElectricBorder
      key={title}
      color={color}
      speed={1.5}
      chaos={0.16}
      borderRadius={16}
    >
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          {description && (
            <p className="card-description">{description}</p>
          )}
        </div>
        {children && (
          <div className="card-content">
            {children}
          </div>
        )}
      </div>
    </ElectricBorder>
  )
}