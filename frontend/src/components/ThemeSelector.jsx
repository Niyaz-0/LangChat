import React from 'react'
import { Palette } from "lucide-react"
import { THEMES } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../store/themeSlice';

export default function ThemeSelector() {

    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

  return (
    <div className='dropdown dropdown-end'>

        <button tabIndex={0} className='btn btn-ghost btn-circle'>
            <Palette className="size-6" />
        </button>

        <div tabIndex={0} className='dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border-base-content/10 max-h-80 overflow-y-auto'>
            <div className='space-y-1'>
                {THEMES.map(themeOption => (
                    <button key={themeOption.name} className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${theme === themeOption.name ? "bg-primary/10 text-primary" : "hover:bg-base-content/5"}`} onClick={() => dispatch(changeTheme(themeOption.name))}>
                        <Palette className='size-4' />
                        <span className='text-sm font-medium'>{themeOption.name}</span>
                        {
                            themeOption.colors.map((color, index) => (
                                <span key={index} className='size-2 rounded-full' style={{backgroundColor: color}} />
                            ))
                        }
                    </button>
                ))}
            </div>
        </div>
    </div>
  )
}
