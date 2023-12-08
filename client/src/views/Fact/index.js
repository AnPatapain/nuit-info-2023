import { Container } from 'components/shared'
import { Button, Tooltip } from 'components/ui'
import React, { useState, useEffect } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { apiGetDailyFacts } from 'services/FactService'
import NewIdeaModal from './components/NewDailyFactDialog'
import FactCard from './components/FactCard'
import { t } from 'i18next'


const mockData = [
    {
      "profileId": "60d0fe4f7fe60b002252a5f4",
      "vote": 10,
      "comments": [
        {
          "profileId": "60d0fe4f7fe60b002252a5f5",
          "content": "This is a comment.",
          "timeStamp": "2023-01-01T12:00:00.000Z"
        },
        {
          "profileId": "60d0fe4f7fe60b002252a5f6",
          "content": "Another comment here.",
          "timeStamp": "2023-01-02T08:30:00.000Z"
        }
      ],
      "title": "Test Daily Fact 1",
      "fact": "This is a sample daily fact.",
      "image": "https://placehold.co/600x400/EEE/31343C",
      "timeStamp": "2023-01-01T00:00:00.000Z"
    },
    {
      "profileId": "60d0fe4f7fe60b002252a5f7",
      "vote": 5,
      "comments": [
        {
          "profileId": "60d0fe4f7fe60b002252a5f8",
          "content": "Comment for the second daily fact.",
          "timeStamp": "2023-01-03T10:45:00.000Z"
        }
      ],
      "title": "Test Daily Fact 2",
      "fact": "Another sample daily fact.",
      "image": "https://placehold.co/600x400/EEE/31343C",
      "timeStamp": "2023-01-02T00:00:00.000Z"
    },
    {
      "profileId": "60d0fe4f7fe60b002252a5f9",
      "vote": 8,
      "comments": [
        {
          "profileId": "60d0fe4f7fe60b002252a5fa",
          "content": "Yet another comment.",
          "timeStamp": "2023-01-04T15:20:00.000Z"
        },
        {
          "profileId": "60d0fe4f7fe60b002252a5fb",
          "content": "Last comment here.",
          "timeStamp": "2023-01-05T09:00:00.000Z"
        }
      ],
      "title": "Test Daily Fact 3",
      "fact": "One more sample daily fact.",
      "image": "https://placehold.co/600x400/EEE/31343C",
      "timeStamp": "2023-01-03T00:00:00.000Z"
    },
    {
      "profileId": "60d0fe4f7fe60b002252a5fc",
      "vote": 12,
      "comments": [
        {
          "profileId": "60d0fe4f7fe60b002252a5fd",
          "content": "Comment for the fourth daily fact.",
          "timeStamp": "2023-01-06T14:00:00.000Z"
        }
      ],
      "title": "Test Daily Fact 4",
      "fact": "Yet another sample daily fact.",
      "image": "https://placehold.co/600x400/EEE/31343C",
      "timeStamp": "2023-01-04T00:00:00.000Z"
    }
  ]


const Fact = () => {
    const [opened, setOpened] = useState(false);
    const [facts, setFacts] = useState([]);
    useEffect(() => {
      const getFacts = async () => {
        const response = await apiGetDailyFacts();
        console.log(response.data);
        setFacts(response.data);
      }
      getFacts();
    }, []);
    const onClickAddNewFact = () => {
      setOpened(true)
  }
    return (
        <Container>
            <div className="max-w-[600px] mx-auto flex items-center justify-between gap-10">
                <h1 className="text-3xl font-bold">{t('fact.daily_fact')}</h1>
                <Tooltip title={t('fact.today_new_fact')} placement="bottom">
                    <Button
                        className=""
                        variant="solid"
                        icon={<IoIosAddCircleOutline />}
                        onClick={onClickAddNewFact}
                    ></Button>
                </Tooltip>
            </div>

            <div className="w-full flex flex-col gap-4 px-20">
                {facts && facts.length > 0 ? facts.map((fact) => (
                    <FactCard fact={fact} key={fact.profileId}/> )) : 
                    <div className="text-center text-lg text-gray-400 dark:text-gray-600">
                        {t('fact.no_fact')}
                    </div>
                    }
            </div>
            <NewIdeaModal opened={opened} onClose={() => setOpened(false)} />
        </Container>
    )
}

export default Fact
