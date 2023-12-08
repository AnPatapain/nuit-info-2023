import { Button, Dialog } from 'components/ui'
import React from 'react'
import NewDailyFactForm from './NewDailyFactForm'
const NewIdeaModal = ({opened, onClose}) => {

  return (
    <Dialog
      isOpen={opened}
      onClose={onClose}
      title='New Daily Fact'
      className='w-full max-w-[600px]'
    >
      <h4>Share your daily fact</h4>
      <div className='mt-4 max-h-[600px] overflow-y-auto'>
        <NewDailyFactForm />
      </div>
    </Dialog>
  )
}

export default NewIdeaModal
