import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import { memo } from 'react'

type Props = {
  onClick: () => void
}

const EditButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} type="primary" icon={<FontAwesomeIcon icon={faPencil} />}>
      Редактировать
    </Button>
  )
}

export default memo(EditButton)
