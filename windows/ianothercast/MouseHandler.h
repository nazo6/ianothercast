#pragma once

#include "pch.h"

#include <functional>

#include "NativeModules.h"

#include <winrt/Windows.UI.Core.h>
#include <winrt/Windows.UI.Input.h>
#include <winrt/Windows.UI.Xaml.h>
#include <winrt/Windows.UI.Xaml.Input.h>
#include <winrt/Windows.System.h>

namespace winrt
{
  using namespace Windows::UI::Input;
  using namespace Windows::UI::Xaml;
  using namespace Windows::UI::Xaml::Input;
  using namespace Windows::System;
}

namespace MouseHandler
{

  REACT_MODULE(MouseHandler);
  struct MouseHandler
  {
    REACT_METHOD(Register);
    void Register() noexcept {
      m_token = winrt::Window::Current().CoreWindow().PointerPressed(
      [=](winrt::CoreWindow const&, winrt::PointerEventArgs const args) {
        winrt::PointerPointProperties pointerProps = args.CurrentPoint().Properties();
        if (pointerProps.IsXButton1Pressed()) {
          XButton1Click();
        }
        else if (pointerProps.IsXButton2Pressed()) {
          XButton2Click();
        }
        else if (pointerProps.IsLeftButtonPressed()) {
          LeftButtonClick();
        }
        else if (pointerProps.IsRightButtonPressed()) {
          RightButtonClick();
        }
        else if (pointerProps.IsMiddleButtonPressed()) {
          MiddleButtonClick();
        }
        return;
      });
    }
    REACT_METHOD(Remove);
    void Remove() noexcept {
      winrt::Window::Current().CoreWindow().PointerPressed(m_token);
    }
    REACT_EVENT(XButton1Click);
    std::function<void()> XButton1Click;
    REACT_EVENT(XButton2Click);
    std::function<void()> XButton2Click;
    REACT_EVENT(RightButtonClick);
    std::function<void()> RightButtonClick;
    REACT_EVENT(LeftButtonClick);
    std::function<void()> LeftButtonClick;
    REACT_EVENT(MiddleButtonClick);
    std::function<void()> MiddleButtonClick;

    private:
      winrt::event_token m_token;
  };
}