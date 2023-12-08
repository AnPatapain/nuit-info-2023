import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import BoardCardList from './BoardCardList'

const BoardColumn = (props) => {
    const { title, contents, index, isScrollable, isCombineEnabled, useClone } =
        props

    return (
        <Draggable draggableId={title} index={index}>
            {(provided, snapshot) => (
                <div
                    className="
							board-column 
							flex 
							flex-col
							mb-3
							min-w-[300px] 
							w-[300px] 
							max-w-[300px] 
							p-0
							rounded-lg
						"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <BoardCardList
                        dragHandleProps={provided.dragHandleProps}
                        listId={title}
                        listType="CONTENT"
                        className={snapshot.isDragging ? 'is-dragging' : ''}
                        contents={contents}
                        internalScroll={isScrollable}
                        isCombineEnabled={isCombineEnabled}
                        useClone={useClone}
                    />
                </div>
            )}
        </Draggable>
    )
}

export default BoardColumn
