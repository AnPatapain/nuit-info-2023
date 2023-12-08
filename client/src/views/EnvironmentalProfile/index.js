import { Container } from 'components/shared'
import { Card, Tooltip, Button } from 'components/ui'
import React, { useEffect, useState } from 'react'
import { apiGetDailyImpacts } from 'services/DailyImpactService'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { t } from 'i18next'
import EnvironmentalProfileForm from './components/EnvironmentalProfileForm'
const EnvironmentalProfile = () => {
  const [impacts, setImpacts] = useState([])
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    apiGetDailyImpacts().then((res) => {
      setImpacts(res.data)
    })
  }, [])

  const onClickAddNewFact = () => {
    setOpened(true)
  }
  return (
    <Container>
      <h1 className='text-center mx-auto'>{t("impact.environmental_impact")}</h1>
      <Tooltip
        title={t('impact.new_impact')}
        placement='right'
      >

        <Button
          className=""
          variant="solid"
          icon={<IoIosAddCircleOutline />}
          onClick={onClickAddNewFact}
        ></Button>
      </Tooltip>
      {/* {impacts && impacts.length > 0 ? 
      <div>
        {impacts.map((impact) => (
          <Card>
            <div>
              {impact.title}
            </div>
            <div>
              {impact.fact}
            </div>
            <div>
              {impact.image}
            </div>
            <div>
              {impact.vote}
            </div>
          </Card>
        ))}
      </div>
      : <div>{t('impact.no_impacts_yet')}</div>} */}
      {/* <Card>

        <div>


        </div>
        <div>
          Score: 0
        </div>
      </Card> */}
      <EnvironmentalProfileForm opened={opened} onClose={() => setOpened(false)} />
    </Container>
  )
}

export default EnvironmentalProfile
