import React from 'react'
import './SuggestionType.scss'

export const SuggestionType = ({img, name}) => {
  return (
    <div className='SuggestionTypeCard'>
      <img className='SuggestionTypeCardImg' src={img}/>
      <p className='SuggestionTypeCardContent'>{name}</p>
    </div>
  )
}
