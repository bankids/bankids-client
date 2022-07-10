import { ComponentStory, ComponentMeta } from '@storybook/react';
import PrimaryModal from './PrimaryModal';

export default {
  title: '모달/PrimaryModal',
  component: PrimaryModal,
  argTypes: {
    onSubmit: { action: 'handle Submit' },
  },
} as ComponentMeta<typeof PrimaryModal>;

const Template: ComponentStory<typeof PrimaryModal> = (args) => (
  <PrimaryModal {...args} />
);

export const 가족이_생겼어요 = Template.bind({});
가족이_생겼어요.args = {
  mainLabel: '가족이 생겼어요',
  subLabel: '기획에서 워딩 생각해주세요',
};
