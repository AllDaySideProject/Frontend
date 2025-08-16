import React from 'react'
import './SuggestionType.scss'

export const SuggestionType = ({
  imgSrc,
  name,
  selected = false,
  onClick,
  imgWidth,   
  imgHeight,  
}) => {
  return (
    <button
      type="button"
      className={`SuggestionTypeCard ${selected ? 'is-selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <div className="SuggestionTypeThumb">
        <img
          src={imgSrc}
          alt={`${name} 아이콘`}
          style={imgWidth || imgHeight ? { width: imgWidth, height: imgHeight } : {}}
        />
      </div>
      <p className="SuggestionTypeCardContent">{name}</p>
    </button>
  )
}
