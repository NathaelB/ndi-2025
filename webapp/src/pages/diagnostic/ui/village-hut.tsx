interface VillageHutProps {
  isActive: boolean
  index: number
}

export function VillageHut({ isActive, index }: VillageHutProps) {
  return (
    <div className="relative group">
      {/* Hutte */}
      <div
        className={`relative transition-all duration-700 ${isActive ? 'scale-110' : 'scale-100'
          }`}
      >
        {/* Toit de la hutte */}
        <div
          className={`w-16 h-12 sm:w-20 sm:h-14 rounded-t-full transition-all duration-700 ${isActive
              ? 'bg-gradient-to-b from-yellow-600 to-orange-600'
              : 'bg-gradient-to-b from-gray-600 to-gray-700'
            }`}
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        >
          {/* Glow effect quand actif */}
          {isActive && (
            <div className="absolute inset-0 animate-pulse">
              <div
                className="w-full h-full bg-yellow-400 opacity-50 blur-sm"
                style={{
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                }}
              />
            </div>
          )}
        </div>

        {/* Corps de la hutte */}
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg transition-all duration-700 ${isActive
              ? 'bg-gradient-to-b from-amber-700 to-amber-900 border-2 border-yellow-500'
              : 'bg-gradient-to-b from-gray-700 to-gray-800 border-2 border-gray-600'
            }`}
        >
          {/* Porte */}
          <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-8 rounded-t-lg transition-all duration-700 ${isActive
                ? 'bg-gradient-to-b from-orange-400 to-orange-600'
                : 'bg-gray-900'
              }`}
          />

          {/* Fenêtre */}
          <div
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-700 ${isActive ? 'bg-yellow-300 shadow-lg shadow-yellow-500/50' : 'bg-gray-900'
              }`}
          >
            {/* Light effect */}
            {isActive && (
              <div className="absolute inset-0 rounded-full bg-yellow-400 animate-pulse" />
            )}
          </div>

          {/* Fumée qui sort de la cheminée si actif */}
          {isActive && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-8 relative">
                <div className="absolute bottom-0 w-2 h-2 bg-gray-400 rounded-full opacity-70 animate-smoke-1" />
                <div className="absolute bottom-0 w-2 h-2 bg-gray-300 rounded-full opacity-50 animate-smoke-2" />
                <div className="absolute bottom-0 w-2 h-2 bg-gray-200 rounded-full opacity-30 animate-smoke-3" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Numéro de la hutte */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-muted-foreground">
        {index + 1}
      </div>

      {/* Tooltip on hover */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
        {isActive ? '🔥 Allumée' : '💤 Éteinte'}
      </div>
    </div>
  )
}
