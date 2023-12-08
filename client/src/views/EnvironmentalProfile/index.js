import { Container } from 'components/shared'
import { Card, Tooltip, Button } from 'components/ui'
import React, { useEffect, useState } from 'react'
import { apiGetDailyImpacts , apiGetTreeLevel } from 'services/DailyImpactService'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { t } from 'i18next'
import EnvironmentalProfileForm from './components/EnvironmentalProfileForm'
import FactCard from "../Fact/components/FactCard";
import DailyImpactCard from "./components/DailyImpactCard";
const EnvironmentalProfile = () => {
  const [impacts, setImpacts] = useState([])
  const [levels, setLevels] = useState(0)
  const [imageIndex, setImageIndex] = useState(1)
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    apiGetDailyImpacts().then((res) => {
        setImpacts(res.data)
    })
    apiGetTreeLevel().then((res) => {
        setLevels(res.data)
    })
  }, [])
  useEffect(() => {
    if (levels >= 0 && levels <= 20) {
      setImageIndex(1)
    } else if (levels >= 20 && levels <= 40) {
      setImageIndex(2)
    } else if (levels >= 40 && levels <= 60) {
      setImageIndex(3)
    } else if (levels >= 60 && levels <= 80) {
      setImageIndex(4)
    } else if (levels >= 80 && levels <= 100) {
      setImageIndex(5)
    }
  }, [levels])
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
      <div className='mt-10'>
        <Card 
          className="w-[700px] h-[500px] mx-auto"
          bodyClass="w-full h-[300px] mx-auto flex gap-4">
            <div className="text-center text-lg flex flex-col">
              <span>{t("impact.your_tree_level_depends_on_your_total_environmental_impact_points")}</span>
                {t('impact.tree_level')} {imageIndex}
            </div>  
            <img src={`/img/plant/plant${1}.png`} alt="tree" 
              style={{
                width: '100px',
                height: '400px',
                transform: 'translateY(-40%)',
              }}
            />
        </Card>
        </div>
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
