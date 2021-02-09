#include "pch.h"
#include "ReactPackageProvider.h"
#include "NativeModules.h"

#include <ModuleRegistration.h>

// NOTE: You must include the headers of your native modules here in
// order for the AddAttributedModules call below to find them.
#include "MouseHandler.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::ianothercast::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
    AddAttributedModules(packageBuilder);
}

} // namespace winrt::ianothercast::implementation
