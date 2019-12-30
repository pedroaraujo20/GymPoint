import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import CheckIns from '~/pages/CheckIns';

import List from '~/pages/Help/List';
import Details from '~/pages/Help/Details';
import New from '~/pages/Help/New';

import Header from '~/components/Header';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Check: createStackNavigator(
              {
                CheckIns,
              },
              {
                navigationOptions: {
                  tabBarLabel: 'Check-ins',
                  tabBarIcon: ({ tintColor }) => (
                    <Icon name="edit-location" size={20} color={tintColor} />
                  ),
                },
                defaultNavigationOptions: {
                  headerBackground: <Header />,
                  headerBackImage: () => (
                    <Icon name="chevron-left" size={24} color="#000" />
                  ),
                },
              }
            ),
            Help: {
              screen: createStackNavigator(
                {
                  List,
                  Details,
                  New,
                },
                {
                  navigationOptions: {
                    tabBarLabel: 'Pedir ajuda',
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="live-help" size={20} color={tintColor} />
                    ),
                  },
                  defaultNavigationOptions: {
                    headerBackground: <Header />,
                    headerBackImage: () => (
                      <Icon name="chevron-left" size={24} color="#000" />
                    ),
                  },
                }
              ),
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              labelStyle: {
                margin: 0,
                fontSize: 14,
              },
              tabStyle: {
                padding: 12,
              },
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#FFF',
                height: 70,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
