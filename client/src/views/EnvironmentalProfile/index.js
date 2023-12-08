import { Container } from 'components/shared'
import { Card, Tooltip, Button } from 'components/ui'
import React, { useEffect, useState } from 'react'
import { apiGetDailyImpacts } from 'services/DailyImpactService'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { t } from 'i18next'
import EnvironmentalProfileForm from './components/EnvironmentalProfileForm'
import FactCard from "../Fact/components/FactCard";
import DailyImpactCard from "./components/DailyImpactCard";
const EnvironmentalProfile = () => {
  const [impacts, setImpacts] = useState([])
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    apiGetDailyImpacts().then((res) => {
        console.log(res.data)
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

        <div className="w-full flex flex-col gap-4 px-20">
            {impacts && impacts.length > 0 ? impacts.map((impact) => (
                    <DailyImpactCard impact={impact} key={impact._id}/> )) :
                <div className="text-center text-lg text-gray-400 dark:text-gray-600">
                    {t('fact.no_fact')}
                </div>
            }
        </div>
  



      <EnvironmentalProfileForm opened={opened} onClose={() => setOpened(false)} />
    </Container>
  )
}

export default EnvironmentalProfile
