import React, { useState } from 'react'


interface  PropsInterface{
  text: string;
}
const InputField:React.FC<PropsInterface> = () => {
  const [todo, setTodo] = useState<string | number>()

  return (
    <div>
      <form>
        <input type="text" name="text" id="text" />
        <button type="submit">Go</button>
      </form>
    </div>
  )
}

export default InputField