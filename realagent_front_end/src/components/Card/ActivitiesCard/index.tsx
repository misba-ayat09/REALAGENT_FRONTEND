import { Divider, Flex, Paper, Text } from '@mantine/core';
import classes from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { formatDateOrToday, formatTimeFromDate, getDayLabel } from '../../../utils';
import SimpleButton from '../../Button/SimpleButton';
import { Activity } from '../../../store/features/activities/types';
import { PATH_WEBSITE } from '../../../router/route';
import { NavigationIcon, NavigationIconType } from '../../Navigation/NavigationIcon';

interface ActivitiesCardProps {
  activity: Activity;
}

const ActivitiesCard: React.FC<ActivitiesCardProps> = ({ activity }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH_WEBSITE.websiteActivitiesChat + '?chatId=' + activity._id);
  };

  return (
    <>
      <Flex w={'100%'} direction={'column'} align="center" justify="space-between">
        <Flex w={'100%'} pb={10} pl={10} justify={'space-between'} align={'center'} gap={'10px'}>
          <Flex direction={'column'} gap={'5px'} w={'60%'}>
            <Flex justify="space-between" align={'center'} gap={'8px'}>
              <Text fw={600} fz={14} ff={'Roboto'} c={'#B1B1B1'} mt={0} pt={0}>
                {getDayLabel(activity.createdAt)}
              </Text>
            </Flex>

            <Flex justify={'flex-start'} align={'center'} gap={'8px'}>
              <Text className={classes.title}>{activity.meetingData?.attendees[0].name}</Text>
              {activity.meetingData && <NavigationIcon type={NavigationIconType.Meet} color={'#007BFF'} size={24} />}
            </Flex>
            <Text className={classes.detail} lineClamp={3}>
              {activity.meetingData?.description ?? ''}
            </Text>
          </Flex>

          {activity.meetingData && (
            <Flex direction="column" align="flex-start" gap={'16px'} mr={'21px'} w={'20%'}>
              <Text fw={600} fz={'16px'} ff={'Roboto'} c={'#292929'}>
                {`Date :${formatDateOrToday(activity.meetingData?.meetingStart)}`}
              </Text>
              <Text fw={600} fz={'16px'} ff={'Roboto'} c={'#292929'}>
                {`Time : ${formatTimeFromDate(activity.meetingData?.meetingStart)}`}
              </Text>
            </Flex>
          )}

          <Flex direction="column" align="center" gap={'16px'} mr={'21px'} w={'10%'}>
            <SimpleButton text="View details" onClick={handleClick} />
          </Flex>
        </Flex>
        <Paper w={'100%'}>
          <Divider pb={16} c={'#DCE5EA'} size={'2px'} />
        </Paper>
      </Flex>
    </>
  );
};

export default ActivitiesCard;
