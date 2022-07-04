import { ComponentStory, ComponentMeta } from '@storybook/react';
import TopAppBar from './TopAppBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default {
  title: 'Common/TopAppBar',
  component: TopAppBar,
  argTypes: {},
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <div
                style={{
                  backgroundColor: '#F7F7F8',
                  width: '100%',
                  height: 'calc(var(--vh, 1vh) * 100)',
                }}
              >
                <Story />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    ),
  ],
} as ComponentMeta<typeof TopAppBar>;

const Template: ComponentStory<typeof TopAppBar> = (args) => (
  <TopAppBar {...args} />
);

export const 내_정보_수정 = Template.bind({});
내_정보_수정.args = {
  previous: '내정보 수정',
};